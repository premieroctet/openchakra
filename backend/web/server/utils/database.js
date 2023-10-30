const lodash = require('lodash')
const mongoose = require('mongoose')
const formatDuration = require('format-duration')
const {splitRemaining} = require('../../utils/text')
const {UPDATED_AT_ATTRIBUTE, CREATED_AT_ATTRIBUTE, MODEL_ATTRIBUTES_DEPTH} = require('../../utils/consts')
const UserSessionData = require('../models/UserSessionData')
const Booking = require('../models/Booking')
const {CURRENT, FINISHED} = require('../plugins/fumoir/consts')
const {BadRequestError, NotFoundError} = require('./errors')

// const { ROLES, STATUS } = require("../../utils/aftral_studio/consts");
// TODO: Omporting Theme makes a cyclic import. Why ?
// const Theme = require('../models/Theme');

const MONGOOSE_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

// Utilities
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

/**
Retourne true si field (model.attribute) contient id
req fournit le contexte permettant de trouver le modèle dans la bonne BD
TODO Use mongoose.models instead
*/
const hasRefs = (req, field, id) => {
  const modelName = field.split('.')[0]
  /* eslint-disable global-require */
  const model = require(`../models/${modelName}`)
  /* eslint-enable global-require */
  const attribute = field
    .split('.')
    .slice(1)
    .join('.')
  return model.exists({[attribute]: id})
}

/**
Compares attributes recursively :
- 1st level attributes are sorted lexicographically
- 2nd level attributes are greater than 1st level ones, then lexicographically sorted
*/
const attributesComparator = (att1, att2) => {
  if (att1.includes('.') == att2.includes('.')) {
    return att1.localeCompare(att2)
  }
  return att1.includes('.') ? 1 : -1
}

let COMPUTED_FIELDS_GETTERS = {}
let COMPUTED_FIELDS_SETTERS = {}

let DECLARED_ENUMS = {}

let DECLARED_VIRTUALS = {}

const getVirtualCharacteristics = (modelName, attName) => {
  if (
    !(modelName in DECLARED_VIRTUALS) ||
    !(attName in DECLARED_VIRTUALS[modelName])
  ) {
    throw new Error(`Missing virtual declaration for ${modelName}.${attName}`)
  }
  return DECLARED_VIRTUALS[modelName][attName]
}

const getAttributeCaracteristics = (modelName, att) => {
  const multiple = att.instance == 'Array'
  const suggestions = att.options?.suggestions
  const baseData = att.caster || att
  // TODO: fix type ObjectID => Object
  const type =
    baseData.instance == 'ObjectID' ? baseData.options.ref : baseData.instance
  const ref = baseData.instance == 'ObjectID'
  let enumValues
  if (!lodash.isEmpty(att.enumValues)) {
    enumValues=att.enumValues
  }
  if (!lodash.isEmpty(att.options?.enum)) {
    enumValues=att.options.enum
  }
  if (enumValues) {
    const enumObject=DECLARED_ENUMS[modelName]?.[att.path]
    if (!enumObject) {
      throw new Error(`${modelName}.${att.path}:no declared enum`)
    }
    const enumObjectKeys=Object.keys(enumObject)
    if (lodash.intersection(enumObjectKeys, enumValues).length!=enumValues.length) {
      throw new Error(`${modelName}.${att.path}:inconsistent enum:${JSON.stringify(enumValues)}/${JSON.stringify(enumObjectKeys)}`)
    }
    enumValues=enumObject
  }
  return {
    type,
    multiple,
    ref,
    enumValues,
    suggestions,
  }
}

const getBaseModelAttributes = modelName => {
  const schema = mongoose.model(modelName).schema
  const schema_atts = Object.values(schema.paths).filter(
    att => !att.path.startsWith('_'),
  )
  const virtuals_atts = Object.keys(schema.virtuals)
    .filter(c => c != 'id')
    .map(att => getVirtualCharacteristics(modelName, att))
  const attributes = [...schema_atts, ...virtuals_atts]
  return attributes
}

const getSimpleModelAttributes = modelName => {
  const atts = getBaseModelAttributes(modelName).map(att => [
    att.path,
    getAttributeCaracteristics(modelName, att),
  ])
  return atts
}

const getReferencedModelAttributes = (modelName, level) => {
  const res = getBaseModelAttributes(modelName)
    .filter(att => att.instance == 'ObjectID')
    .map(att =>
      // getSimpleModelAttributes(att.options.ref).map(([attName, instance]) => [
      getModelAttributes(att.options.ref, level-1).map(([attName, instance]) => [
        `${att.path}.${attName}`,
        instance,
      ]),
    )
  return res
}

const getModelAttributes = (modelName, level=MODEL_ATTRIBUTES_DEPTH) => {

  if (level==0) {
    return []
  }

  const attrs = [
    ...getSimpleModelAttributes(modelName),
    ...lodash.flatten(getReferencedModelAttributes(modelName, level)),
  ]

  // Auto-create _count attribute for all multiple attributes
  const multipleAttrs=[] //attrs.filter(att => !att[0].includes('.') && att[1].multiple===true).map(att => att[0])
  const multiple_name=name => `${name}_count`
  multipleAttrs.forEach(name => {
    const multName=multiple_name(name)
    // Create virtual on the fly
    mongoose.models[modelName].schema.virtual(multName).get(function() {
      return this?.[name]?.length || 0
    })
    // TODO: UGLY. Properly handle aliases
    if (modelName=='user') {
      mongoose.models.loggedUser.schema.virtual(multName).get(function() {
        return this?.[name]?.length || 0
      })
    }
    // Declare virtual on the fly
    declareVirtualField({model: modelName, field: multName, instance: 'Number', requires: name})
    if (modelName=='user') {
      declareVirtualField({model: 'loggedUser', field: multName, instance: 'Number', requires: name})
    }
  })

  const attrsWithCounts=[...attrs, ...multipleAttrs.map(name => [multiple_name(name), {type: Number, multiple: false, ref: false}])]
  attrsWithCounts.sort((att1, att2) => attributesComparator(att1[0], att2[0]))
  return attrsWithCounts
}

const getModels = () => {
  const modelNames = lodash.sortBy(mongoose.modelNames())
  const result = {}
  modelNames.forEach(name => {
    const attrs = getModelAttributes(name)
    result[name]={name, attributes: Object.fromEntries(attrs)}
  })
  return result
}

/**
Returns only models & attributes visible for studio users
*/
const getExposedModels = () => {
  const isHidddenAttributeName = (modelName, attName) => {
    return attName.startsWith('_')
  }

  const models=lodash(getModels())
    .omitBy((v, k) => k=='IdentityCounter')
    .mapValues((v, modelName) => ({
      ...v,
      attributes: lodash(v.attributes).omitBy((v, k) => isHidddenAttributeName(modelName, k)),
    }))

  return models.value()
}

// TODO query.populates accepts an array of populates !!!!
const buildPopulates = (modelName, fields) => {
  // Retain all ref fields
  const model=getModels()[modelName]
  if (!model) {
    throw new Error(`Unkown model ${modelName}`)
  }
  const attributes=model.attributes
  let requiredFields=[...fields]
  // Add declared required fields for virtuals
  let added=true
  while (added) {
    added=false
    lodash(requiredFields).groupBy(f => f.split('.')[0]).keys().forEach(directAttribute => {
      let required=lodash.get(DECLARED_VIRTUALS, `${modelName}.${directAttribute}.requires`) || null
      if (required) {
        required=required.split(',')
        if (lodash.difference(required, requiredFields).length>0) {
          requiredFields=lodash.uniq([...requiredFields, ...required])
          added=true
        }
      }
      let relies_on=lodash.get(DECLARED_VIRTUALS, `${modelName}.${directAttribute}.relies_on`) || null
      if (relies_on) {
        const search=new RegExp(`^${directAttribute}(\.|$)`)
        const replace=(match, group1) => `${relies_on}${group1=='.'?'.':''}`
	      requiredFields=requiredFields.map(f => f.replace(search, replace))
      }
    })
  }

  // Retain ref attributes only
  const groupedAttributes=lodash(requiredFields)
    .groupBy(att => att.split('.')[0])
    .pickBy((_, attName) => { if (!attributes[attName]) { throw new Error(`Attribute ${modelName}.${attName} unknown`) } return attributes[attName].ref===true })
    .mapValues(attributes => attributes.map(att => att.split('.').slice(1).join('.')).filter(v => !lodash.isEmpty(v)))

  // / Build populate using att and subpopulation
  const pops=groupedAttributes.entries().map(([attributeName, fields]) => {
    const attType=attributes[attributeName].type
    const subPopulate=buildPopulates(attType, fields)
    return {path: attributeName, populate: lodash.isEmpty(subPopulate)?undefined:subPopulate}
  })
  return pops.value()
}

// Returns mongoose models ordered using child classes first (using discriminators)
const getMongooseModels = () => {
  const conn=mongoose.connection
  const models=conn.modelNames().map(name => conn.models[name])
  // Model with discriminator is a base model => set latest
  return lodash(models)
    .sortBy(model => `${model.discriminators ? '1':'0'}:${model.modelName}`)
    .value()
}
/**
 Returns model from database id
 expectedModel is a string or an array of string.
 If defined and non empty, getModel returns exception if model is found and
 is neither the expectedModel (String type) or included in expectedModel (array type)
*/
const getModel = (id, expectedModel) => {
  return Promise.all(getMongooseModels()
    .map(model => model.exists({_id: id})
        .then(exists => (exists ? model.modelName : false)),
    )
  )
    .then(res => {
      const model=res.find(v => !!v)
      if (!model) {
        throw new Error(`Model not found for ${id}`)
      }
      if (expectedModel && !lodash.isEmpty(expectedModel)) {
        if ((lodash.isString(expectedModel) && expectedModel!=model)
      || (lodash.isArray(expectedModel) && !lodash.includes(expectedModel, model))) { throw new Error(`Found model ${model} for ${id}, ${JSON.stringify(expectedModel)} was expected`) }
      }
      return model
    })
}

const buildQuery = (model, id, fields) => {
  const modelAttributes = Object.fromEntries(getModelAttributes(model))

  const select = lodash(fields)
    .map(att => att.split('.')[0])
    .uniq()
    .filter(att => {
      if (!modelAttributes[att]) {
        throw new Error(`Unknown attribute ${model}.${att}`)
      }
      return modelAttributes[att].ref == false
    })
    .map(att => [att, true])
    .fromPairs()
    .value()

  const criterion = id ? {_id: id} : {}
  let query = mongoose.connection.models[model].find(criterion) //, select)
  const populates=buildPopulates(model, fields)
  //console.log(`Populates for ${model}/${fields} is ${JSON.stringify(populates, null, 2)}`)
  query = query.populate(populates)
  return query
}

const simpleCloneModel = data => {
  return lodash.omit(data.toObject(), ['_id', 'id'])
}

const cloneModel = ({data, withOrigin, forceData = {}}) => {
  let model = null
  let clone = null
  return getModel(data)
    .then(res => {
      model = res
      clone = {
        ...lodash.omit(data.toObject(), ['_id', 'id']),
        origin: withOrigin ? data._id : undefined,
        ...forceData,
      }
      const childrenToClone = getModelAttributes(model)
        .filter(
          ([name, properties]) =>
            !name.includes('.') && properties.ref && properties.multiple,
        )
        .map(([name]) => name)
        // Don(t clone ref attributes if present in extraData
        .filter(name => !Object.keys(forceData).includes(name))
      return Promise.all(
        childrenToClone.map(att => {
          return Promise.all(
            data[att].map(v => cloneModel({data: v, withOrigin})),
          ).then(cloned => (clone[att] = cloned))
        }),
      )
    })
    .then(() => {
      return mongoose.connection.models[model].create(clone)
    })
    .catch(err => {
      console.trace(`${err}:${data}`)
    })
}

const cloneArray = ({data, withOrigin, forceData = {}}) => {
  if (!lodash.isArray(data)) {
    throw new Error(`Expected array, got ${data}`)
  }
  return Promise.all(
    data.map(d => cloneModel({data: d, withOrigin, forceData})),
  )
}

/**
mongoose returns virtuals even if they are not present in select clause
=> keep only require fields in data hierarchy
*/
const retainRequiredFields = ({data, fields}) => {
  if (lodash.isArray(data)) {
    return data.map(d => retainRequiredFields({data: d, fields}))
  }
  if (!lodash.isObject(data)) {
    return data
  }
  const thisLevelFields = [
    'id',
    '_id',
    ...lodash(fields)
      .map(f => f.split('.')[0])
      .uniq()
      .value(),
  ]
  const pickedData = lodash.pick(data, thisLevelFields)
  const nextLevelFields = fields
    .filter(f => f.includes('.'))
    .map(f => f.split('.')[0])
  nextLevelFields.forEach(f => {
    pickedData[f] = retainRequiredFields({
      data: lodash.get(data, f),
      fields: fields
        .filter(f2 => new RegExp(`^${f}\.`).test(f2))
        .map(f2 => f2.replace(new RegExp(`^${f}\.`), '')),
    })
  })
  return pickedData
}

const addComputedFields = (
  fields,
  user,
  queryParams,
  data,
  model,
  prefix = '',
) => {

  if (lodash.isEmpty(fields)) {
    return data
  }
  const newPrefix = `${prefix}/${model}/${data._id}`

  return (model=='user' ? mongoose.models.user.findById(data._id) : Promise.resolve(user))
    .then(newUser => {
      // Compute direct attributes
      // Handle references => sub
      const refAttributes = getModelAttributes(model).filter(
        ([attName, attParams]) => !attName.includes('.') && attParams.ref,
      )
      //for (const refAttribute of refAttributes) {
      return Promise.allSettled(refAttributes.map(([attName, attParams]) => {
        const requiredSubFields=fields
          .filter(f => f.startsWith(`${attName}.`))
          .map(f => splitRemaining(f, '.')[1])

        const children = lodash.flatten([data[attName]]).filter(v => !!v)
        return Promise.allSettled(
          children.map(child =>
            addComputedFields(
              requiredSubFields,
              newUser,
              queryParams,
              child,
              attParams.type,
              `${newPrefix}/${attName}`,
            ),
          ),
        )
      }))
      .then(() => {
        const compFields = COMPUTED_FIELDS_GETTERS[model] || {}
        const presentCompFields = lodash(fields).map(f => f.split('.')[0]).filter(v => !!v).uniq().value()
        const requiredCompFields = lodash.pick(compFields, presentCompFields)

        return Promise.allSettled(
          Object.keys(requiredCompFields).map(f =>
            requiredCompFields[f](newUser, queryParams, data).then(res => {data[f] = res})
          ),
      )})
      .then(() => data)
  })
}

const formatTime = timeMillis => {
  return formatDuration(timeMillis ? timeMillis / 60 : 0, {leading: true})
}

const declareComputedField = (model, field, getFn, setFn) => {
  if (getFn) {
    lodash.set(COMPUTED_FIELDS_GETTERS, `${model}.${field}`, getFn)
  }
  if (setFn) {
    lodash.set(COMPUTED_FIELDS_SETTERS, `${model}.${field}`, setFn)
  }
}

const declareVirtualField=({model, field, ...rest}) => {
  const enumValues=rest.enumValues ? Object.keys(rest.enumValues) : undefined
  lodash.set(DECLARED_VIRTUALS, `${model}.${field}`, {path: field, ...rest, enumValues})
  if (!lodash.isEmpty(rest.enumValues)) {
    declareEnumField({model, field, enumValues: rest.enumValues})
  }
}

const declareEnumField = ({model, field, enumValues}) => {
  lodash.set(DECLARED_ENUMS, `${model}.${field}`, enumValues)
}

// Default filter
let filterDataUser = ({model, data, id, user}) => data

const setFilterDataUser = fn => {
  filterDataUser = fn
}

const callFilterDataUser = data => {
  return filterDataUser(data)
}

// Pre proceses model, fields, id before querying
// If preprocessGet returns attribute data, it is returned instead of actual query
let preprocessGet = data => Promise.resolve(data)

const setPreprocessGet = fn => {
  preprocessGet = fn
}

const callPreprocessGet = data => {
  return preprocessGet(data)
}

// Pre create data, allows to insert extra fields, etc..
let preCreateData = data => Promise.resolve(data)

const setPreCreateData = fn => {
  preCreateData = fn
}

const callPreCreateData = data => {
  return preCreateData(data)
}

// Post create data, allows to create extra data, etc, etc
let postCreateData = data => Promise.resolve(data.data)

const setPostCreateData = fn => {
  postCreateData = fn
}

const callPostCreateData = data => {
  return postCreateData(data)
}

// Post put data
let postPutData = data => Promise.resolve(data)

const setPostPutData = fn => {
  postPutData = fn
}

const callPostPutData = data => {
  return postPutData(data)
}

// Post delete data
let postDeleteData = data => Promise.resolve(data)

const setPostDeleteData = fn => {
  postDeleteData = fn
}

const callPostDeleteData = data => {
  return postDeleteData(data)
}

const putAttribute = ({id, attribute, value, user}) => {
  let model = null
  return getModel(id)
    .then(res => {
      model = res
      const setter=lodash.get(COMPUTED_FIELDS_SETTERS, `${model}.${attribute}`)
      if (setter) {
        callPostPutData({model, id, attribute, value, user})
        return setter({id, attribute, value, user})
      }
      const mongooseModel = mongoose.connection.models[model]

      if (attribute.split('.').length==1) {
        // Simple attribute => simple method
        return mongooseModel.findById(id)
          .then(object => {
            object[attribute]=value
            return object.save()
              .then(obj => {
                return callPostPutData({model, id, attribute, value, params:{[attribute]:value}, user, data: obj})
                  .then(() => obj)
              })
          })
      }
      const populates=buildPopulates(model, [attribute])

      let query=mongooseModel.find({$or: [{_id: id}, {origin: id}]})
      query = populates.reduce((q, key) => q.populate(key), query)
      const allModels=getModels()
      return query
        .then(objects => {
          return Promise.all(objects.map(object => {
            let paths=attribute.split('.')
            let obj=paths.length>1 ? lodash.get(object, paths.slice(0, paths.length-1)) : object
            lodash.set(obj, paths.slice(-1)[0], value)
            return obj.save({runValidators: true})
              .then(obj => {
                let subModel=model
                paths.slice(0, -1).forEach(att => {
                  const params=allModels[subModel].attributes[att]
                  if (params.ref) {
                    subModel=params.type
                  }
                })
                const subData=lodash.get(object, paths.slice(0, -1).join('.'))
                const subId=subData._id.toString()
                const subAttr=paths.slice(-1)
                callPostPutData({model:subModel, id: subId, attribute:subAttr, value,
                  params:{[subAttr]:value},
                  user, data: subData})
                return obj
              })
          }))
        })
    })

}

const removeData = dataId => {
  let model=null
  return getModel(dataId)
    .then(result => {
      model=result
      return mongoose.connection.models[model].findById(dataId)
    })
    .then(data => {
      // TODO: move in fumoir/functions
      if (model=='booking') {
        return Booking.findById(data._id).populate({path: 'orders', populate: 'items'})
          .then(data => {
            if ([FINISHED, CURRENT].includes(data.status)) {
              throw new BadRequestError(`Une réservation terminée ou en cours ne peut être annulée`)
            }
            if (data.paid) {
              throw new BadRequestError(`Une réservation payée ne peut être annulée`)
            }
            return data.delete()
          })
      }
      if (model=='guest') {
        return Promise.all([
          UserSessionData.updateMany({}, {$pull: {guests: {guest: dataId}}}),
          // TODO: update the bookings but the context is required
        ])
          .then(() => data.delete())
      }
      return data.delete()
        .then(d => callPostDeleteData({model, data:d}))
    })
}

// Compares ObjecTID/string with ObjectId/string
const idEqual = (id1, id2) => {
  return JSON.stringify(id1)==JSON.stringify(id2)
}

// Returns intersection betwenn two sets of _id
const differenceSet = (ids1, ids2) => {
  return lodash.differenceBy(ids1, ids2, v => JSON.stringify(v._id || v))
}

// Checks wether ids intersect
const intersection = (ids1, ids2) => {
  return lodash.intersectionBy(ids1, ids2, v => JSON.stringify(v._id || v)).length
}

// Checks wether ids intersect
const setIntersects = (ids1, ids2) => {
  const inter_length=intersection(ids1, ids2)
  return inter_length>0
}

// Return true if obj1.targets intersects obj2.targets
const shareTargets = (obj1, obj2) => {
  if (!(obj1.targets && obj2.targets)) {
    throw new Error(`obj1 && obj2 must have targets:${!!obj1.targets}/${!!obj2.targets}`)
  }
  return lodash.intersectionBy(obj1.targets, obj2.targets, t => t._id.toString()).length>0
}

const putToDb = ({model, id, params, user}) => {
  return mongoose.connection.models[model]
    .findById(id)
    .then(data => {
      if (!data) {throw new NotFoundError(`${model}/${id} not found`)}
      Object.keys(params).forEach(k => { data[k]=params[k] })
      return data.save()
    })
    .then(data => callPostPutData({model, id, params, data, user}))
}

const loadFromDb = ({model, fields, id, user, params}) => {
  return callPreprocessGet({model, fields, id, user, params})
    .then(({model, fields, id, data}) => {
      if (data) {
        return data
      }
      return buildQuery(model, id, fields)
        .then(data => {
          // Lean all objects
          data=data.map(d => d.toObject({virtuals: true}))
          // Force to plain object
          data=JSON.parse(JSON.stringify(data))
          // Remove extra virtuals
          //data = retainRequiredFields({data, fields})
          if (id && data.length == 0) { throw new NotFoundError(`Can't find ${model}:${id}`) }
          return Promise.all(data.map(d => addComputedFields(fields,user, params, d, model)))
        })
        .then(data => callFilterDataUser({model, data, id, user}))
        //.then(data =>  retainRequiredFields({data, fields}))
    })

}

const DATA_IMPORT_FN={}

// Imports data for model. Delegated to plugins
const importData=({model, data}) => {
  if (!DATA_IMPORT_FN[model]) {
    throw new BadRequestError(`Impossible d'importer le modèle ${model}`)
  }
  return DATA_IMPORT_FN[model](data)
}

const setImportDataFunction = ({model, fn}) => {
  if (!model || !fn) {
    throw new Error(`Import data function: expected model and function`)
  }
  if (!!DATA_IMPORT_FN[model]) {
    throw new Error(`Import funciton already exists for model ${model}`)
  }
  DATA_IMPORT_FN[model]=fn
}

module.exports = {
  hasRefs,
  MONGOOSE_OPTIONS,
  attributesComparator,
  getSimpleModelAttributes,
  getReferencedModelAttributes,
  getModelAttributes,
  getModels,
  buildQuery,
  buildPopulates,
  cloneModel,
  cloneArray,
  getModel,
  addComputedFields,
  declareComputedField,
  declareVirtualField,
  declareEnumField,
  formatTime,
  retainRequiredFields,
  setFilterDataUser,
  callFilterDataUser,
  setPreprocessGet,
  callPreprocessGet,
  setPreCreateData,
  callPreCreateData,
  setPostCreateData,
  callPostCreateData,
  setPostPutData,
  callPostPutData,
  removeData,
  putAttribute,
  idEqual,
  getExposedModels,
  simpleCloneModel,
  shareTargets,
  loadFromDb,
  getMongooseModels,
  setIntersects,
  intersection,
  differenceSet,
  putToDb,
  setImportDataFunction,
  importData,
  setPostDeleteData,
}
