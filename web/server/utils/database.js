
const MONGOOSE_OPTIONS={
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // poolSize: 10,
  // useCreateIndex: true,
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

module.exports={hasRefs, MONGOOSE_OPTIONS}
