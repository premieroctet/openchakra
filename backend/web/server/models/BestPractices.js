const {getDataModel}=require('../../config/config')

let BestPractices = null

try {
  const Content = require(`./Content`)
  if (Content) {
    const BestPracticesSchema=require(`../plugins/${getDataModel()}/schemas/BestPracticesSchema`)
    BestPracticesSchema.plugin(require('mongoose-lean-virtuals'))
    BestPractices = Content.discriminator('bestPractices', BestPracticesSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = BestPractices
