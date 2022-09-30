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
  let res;
  if (att1.includes('.')==att2.includes('.')) {
    return att1.localeCompare(att2)
  }
  return att1.includes('.') ? 1 : -1
}

module.exports={hasRefs, MONGOOSE_OPTIONS, attributesComparator}
