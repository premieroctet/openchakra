const mongoose=require('mongoose')
const lodash=require('lodash')

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
    trainees_count: {path: 'trainees_count', instance: 'Number'},
    trainers_count: {path: 'trainees_count', instance: 'Number'},
    start_str: {path: 'start_str', instance: 'String'},
    end_str: {path: 'end_str', instance: 'String'},
  },
  /**
  Array ref virtual example
  program: {
    themes: {path: 'themes', instance: 'Array', caster: {path: 'themes', instance: 'ObjectID'}},
  },
  */
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

  const populates=buildPopulates(fields, model)

  const select=lodash(fields)
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

module.exports={
  hasRefs, MONGOOSE_OPTIONS, attributesComparator,
  getSimpleModelAttributes, getReferencedModelAttributes,
  getModelAttributes, getModels, buildQuery, buildPopulate,
  buildPopulates,
}
