const PromiseSerial = require('promise-serial')
const mongoose=require('mongoose')
const lodash=require('lodash')
const formatDuration = require('format-duration')
// TODO: Omporting Theme makes a cyclic import. Why ?
//const Theme = require('../models/Theme');
const UserSessionData = require('../models/UserSessionData');
require('../models/TrainingCenter')

const MONGOOSE_OPTIONS={
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // poolSize: 10,
  useCreateIndex: true,
  useFindAndModify: false,
}

// Utilities

/**
Retourne true si field (model.attribute) contient id
req fournit le contexte permettant de trouver le modèle dans la bonne BD
TODO Use mongoose.models instead
*/
const hasRefs= (req, field, id) => {
  const modelName=field.split('.')[0]
  /* eslint-disable global-require */
  const model=require(`../models/${modelName}`)
  /* eslint-enable global-require */
  const attribute=field.split('.').slice(1).join('.')
  return model.exists({[attribute]: id})
}

/**
Compares attributes recursively :
- 1st level attributes are sorted lexicographically
- 2nd level attributes are greater than 1st level ones, then lexicographically sorted
*/
const attributesComparator = (att1, att2) => {
  if (att1.includes('.')==att2.includes('.')) {
    return att1.localeCompare(att2)
  }
  return att1.includes('.') ? 1 : -1
}


const DECLARED_VIRTUALS={
  session: {
    trainees_count: {path: 'trainees_count', instance: 'Number', requires: 'trainees'},
    trainers_count: {path: 'trainees_count', instance: 'Number', requires: 'trainers'},
    spent_time: {path: 'spent_time', instance: 'String', requires: 'themes'},
    spent_time_str: {path: 'spent_time_str', instance: 'String', requires: 'themes'},
    contact_name: {path: 'contact_name', instance: 'String', requires: 'name'},
  },
  theme: {
    hidden: {path: 'hidden', instance: 'Boolean', requires: 'name,code,picture'},
    spent_time: {path: 'spent_time', instance: 'String', requires: 'resources'},
    spent_time_str: {path: 'spent_time_str', instance: 'String', requires: 'resources'},
  },
  resource: {
    spent_time: {path: 'spent_time', instance: 'Number', requires: '_id'},
    spent_time_str: {path: 'spent_time_str', instance: 'String', requires: 'spent_time'},
    status: {path: 'status', instance: 'String', required: 'finished'}
  },
  contact: {
    name: {path: 'name', instance: 'String', requires: '_id'},
  },
  user: {
    contact_name: {path: 'contact_name', instance: 'String', requires: 'name,firstname,role'},
  },
  loggedUser: {
    contact_name: {path: 'contact_name', instance: 'String', requires: 'name,firstname,role'},
  },
  message: {
    destinee_name: {path: 'destinee_name', instance: 'String', requires: 'destinee_session.trainers,destinee_session.trainees,destinee_user'},
    sender_name: {path: 'sender_name', instance: 'String', requires: 'sender'},
  },
}

const getVirtualCharacteristics = (modelName, attName) => {
  if (!(modelName in DECLARED_VIRTUALS) || !(attName in DECLARED_VIRTUALS[modelName])) {
    throw new Error(`Missing virtual declaration for ${modelName}.${attName}`)
  }
  return DECLARED_VIRTUALS[modelName][attName]
}

const getAttributeCaracteristics = att => {
  const multiple=att.instance=='Array'
  const baseData = multiple ? att.caster : att
  const type= baseData.instance=='ObjectID' ? baseData.options.ref : baseData.instance
  const ref=baseData.instance=='ObjectID'
  return ({
    type,
    multiple,
    ref,
  })
}

const getBaseModelAttributes = modelName => {
  const schema=mongoose.model(modelName).schema
  const schema_atts=Object.values(schema.paths)
    .filter(att => !att.path.startsWith('_'))
  const virtuals_atts=Object.keys(schema.virtuals).filter(c => c!='id')
    .map(att => getVirtualCharacteristics(modelName, att))
  const attributes=[...schema_atts, ...virtuals_atts]
  return attributes
}

const getSimpleModelAttributes = modelName => {
  const atts=getBaseModelAttributes(modelName)
    .map(att => [att.path, getAttributeCaracteristics(att)])
  return atts
}

const getReferencedModelAttributes = modelName => {
  const res=getBaseModelAttributes(modelName)
    .filter(att => att.instance == 'ObjectID')
    .map(att => getSimpleModelAttributes(att.options.ref)
      .map(([attName, instance]) => [`${att.path}.${attName}`, instance]))
  return res
}

const getModelAttributes = modelName => {
  const attrs=[...getSimpleModelAttributes(modelName), ...lodash.flatten(getReferencedModelAttributes(modelName))]
  attrs.sort((att1, att2) => attributesComparator(att1[0], att2[0]))
  return attrs
}

const getModels = () => {
  const modelNames=lodash.sortBy(mongoose.modelNames())
  const result=[]
  modelNames.forEach(name => {
    const attrs=getModelAttributes(name)
    result.push({name, attributes: Object.fromEntries(attrs)})
  })
  return result
}

const buildPopulate = (field, model) => {
  const fields=field.split('.')
  const attributes=getModels().find(m => m.name==model).attributes
  if (fields.length==0) {
    return null
  }
  const currentField=fields[0]
  const currentAttribute=attributes[currentField]
  if (!currentAttribute) {
    throw new Error(`Can not get attribute for ${model}/${currentField}`)
  }
  if (!currentAttribute.ref) {
    return null
  }
  let result={path: currentField}
  if (fields.length>1) {
    const nextPop=buildPopulate(fields.slice(1).join('.'), currentAttribute.type)
    if (nextPop) {
      result.populate=nextPop
    }
  }
  return result
}

const buildPopulates = (fields, model) => {

  // TODO Bug: in ['program.themes', 'program.otherref']
  // should return {path: 'program', populate: [{path: 'themes'}, {path: 'otherref'}]}
  // but today return {path: 'program', populate: {path: 'themes'}]}
  // tofix: cf. lodash.mergeWith
  const modelAttributes=Object.fromEntries(getModelAttributes(model))

  const modelAttributesNames=Object.keys(modelAttributes)
  const requiredAttributesNames=lodash(fields).map(f => f.split('.')[0]).uniq().value()
  const unknownAttributesNames=lodash(requiredAttributesNames).difference(modelAttributesNames).value()
  if (unknownAttributesNames.length>0) {
    throw new Error(`Model ${model} : unknown attributes ${unknownAttributesNames}`)
  }

  const populates=lodash(fields)
  // Retain only ObjectId fields
    .filter(att => modelAttributes[att.split('.')[0]].ref==true)
    .groupBy(att => att.split('.')[0])
    // Build populates for each 1st level attribute
    .mapValues(fields => fields.map(f => buildPopulate(f, model)))
    // Merge populates for each 1st level attribute
    .mapValues(
      pops => pops.reduce(
        (acc, pop) => lodash.mergeWith(acc, pop),
      ), {})
    .values()
    .value()
  return populates
}

const buildQuery = (model, id, fields) => {

  console.log(`Requesting model ${model}, id ${id || 'none'} fields:${fields}`)
  const modelAttributes=Object.fromEntries(getModelAttributes(model))

  const virtuals=lodash(fields.map(f => f.split('.')[0]))
    .uniq()
    .map(f => DECLARED_VIRTUALS[model]?.[f]?.requires?.split(','))
    .flatten()
    .filter(f => !!f)
    .value()

  const allFields=[...fields, ...virtuals]

  const populates=buildPopulates(allFields, model)

  const select=lodash(allFields)
    .map(att => att.split('.')[0])
    .uniq()
    .filter(att => modelAttributes[att].ref==false)
    .map(att => ([att, true]))
    .fromPairs()
    .value()

  const criterion=id ? {_id: id}: {}
  let query=mongoose.connection.models[model].find(criterion, select)
  query=populates.reduce((q, key) => q.populate(key), query)
  return query
}

const cloneArray = ({data, withOrigin, forceData={}}) => {
  if (!lodash.isArray(data)) { throw new Error(`Expected array, got ${data}`) }
  return Promise.all(data.map(d => cloneModel({data: d, withOrigin, forceData})))
}

const cloneModel = ({data, withOrigin, forceData={}}) => {
  let model=null
  let clone=null
  return getModel(data)
    .then(res => {
      model=res
      clone={...lodash.omit(data.toObject(), ['_id', 'id']), origin: withOrigin ? data._id:undefined, ...forceData}
      const childrenToClone=getModelAttributes(model)
        .filter((([name, properties]) => !name.includes('.') && properties.ref && properties.multiple))
        .map(([name]) => name)
      // Don(t clone ref attributes if present in extraData
        .filter(name => !Object.keys(forceData).includes(name))
      return Promise.all(childrenToClone.map(att => {
        return Promise.all(data[att].map(v => cloneModel({data: v, withOrigin})))
          .then(cloned => clone[att]=cloned)
      }))
    })
    .then(res => {
      return mongoose.connection.models[model].create(clone)
    })
    .catch(err => {
      console.trace(`${err}:${data}`)
    })
}

const getModel = id => {
  const conn=mongoose.connection
  return Promise.all(conn.modelNames().map(model =>
    conn.models[model].exists({_id: id}).then(exists => (exists ? model : false)),
  ))
    .then(res => {
      return res.find(v => !!v)
    })
}

const addComputedFields= async (user, queryParams, data, model) => {

  if (model=='user') {
    return data
  }

  // UGLY
  /**
  if (model=='session') {
    queryParams.session=data._id.toString()
  }*/
  const compFields=COMPUTED_FIELDS[model] || {}
  // Compute direct attributes
  const x=await PromiseSerial(Object.keys(compFields).map(f => () => compFields[f](user, queryParams, data)
    .then(res => {data[f]=res})))
  // Handle references => sub
  const refAttributes=getModelAttributes(model).filter(att => !(att[0].includes('.')) && att[1].ref)
  for ([attName, attParams] of refAttributes) {
    const children=data[attName]
    if (children) {
      if (attParams.multiple) {
        const y=await PromiseSerial(children.map(child => () => addComputedFields(user, queryParams, child, attParams.type)))
      }
      else {
        const z=await addComputedFields(user, queryParams, children, attParams.type)
      }
    }
  }
  return data
}

const formatTime= (timeMillis) => {
  return formatDuration(timeMillis||0, {leading: true})
}

const getResourceSpentTime = async (user, queryParams, resource) => {
  const data=await UserSessionData.find({user: user._id})
  const spent=lodash(data)
    .map(d => d.spent_times)
    .flatten()
    .find(sp => sp.resource._id.toString()==resource._id.toString())
  return spent?.spent_time || 0
}

/** Not finished, not in progress:
+  Parent theme ordered:
+   - first in theme: "available"
+   - next of 'finished' one : "available"
+   - else "to come"
+  Parent theme unordered: available
+  */
const getResourceStatus = async (user, queryParams, resource) => {
  const [data, spent]=await Promise.all([
    UserSessionData.findOne({user: user._id}, {finished:1}),
    getResourceSpentTime(user, queryParams, resource)
  ])
  const finished=data?.finished.find(r => r.toString()==resource._id.toString())
  if (finished) {
    return 'Terminé'
  }
  if (spent>0) {
    return `En cours`
  }
  return 'Disponible'
}

const getResourceSpentTimeStr = async (user, queryParams, resource) => {
  const res=await getResourceSpentTime(user, queryParams, resource)
  const str=formatTime(res)
  return str
}

const getThemeSpentTime = async (user, queryParams, theme) => {
  const data=await mongoose.connection.models['theme'].findById(theme._id.toString())
  const results=await Promise.all(data.resources.map(r => getResourceSpentTime(user, queryParams, r._id)))
  const spent=lodash.sum(results)
  return spent
}

const getThemeSpentTimeStr = async (user, queryParams, theme) => {
  const res=await getThemeSpentTime(user, queryParams, theme)
  return formatTime(res)
}

const getSessionSpentTime = async (user, queryParams, session) => {
  const data=await mongoose.connection.models['session'].findById(session._id.toString())
  if (!data) { return 0}
  const results=await Promise.all(data.themes.map(t => getThemeSpentTime(user, queryParams, t._id)))
  const spent=lodash.sum(results)
  return spent
}

const getSessionSpentTimeStr = async (user, queryParams, session) => {
  const res=await getSessionSpentTime(user, queryParams, session)
  return formatTime(res)
}


const COMPUTED_FIELDS={
  resource: {
    spent_time: getResourceSpentTime,
    spent_time_str: getResourceSpentTimeStr,
    status: getResourceStatus,
  },
  theme: {
    spent_time: getThemeSpentTime,
    spent_time_str: getThemeSpentTimeStr,
  },
  session: {
    spent_time: getSessionSpentTime,
    spent_time_str: getSessionSpentTimeStr,
  }
}

module.exports={
  hasRefs, MONGOOSE_OPTIONS, attributesComparator,
  getSimpleModelAttributes, getReferencedModelAttributes,
  getModelAttributes, getModels, buildQuery, buildPopulate,
  buildPopulates, cloneModel, cloneArray, getModel,
  addComputedFields,
}
