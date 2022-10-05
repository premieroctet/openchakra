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
  const type=multiple ? att.caster.path.replace(/s$/, '') : att.instance=='ObjectID' ? att.options.ref : att.instance
  const ref=att.instance=='ObjectID'
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

module.exports={
  hasRefs, MONGOOSE_OPTIONS, attributesComparator,
  getSimpleModelAttributes, getReferencedModelAttributes,
  getModelAttributes, getModels,
}
