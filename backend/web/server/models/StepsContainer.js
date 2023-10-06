const {getDataModel}=require('../../config/config')

let StepsContainer = null

try {
  const Content = require(`./Content`)
  if (Content) {
    const StepsContainerSchema=require(`../plugins/${getDataModel()}/schemas/StepsContainerSchema`)
    StepsContainerSchema.plugin(require('mongoose-lean-virtuals'))
    StepsContainer = Content.discriminator('stepsContainer', StepsContainerSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = StepsContainer
