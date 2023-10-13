const {getDataModel}=require('../../config/config')

let Tip = null

try {
  const Content = require(`./Content`)
  if (Content) {
    const TipSchema=require(`../plugins/${getDataModel()}/schemas/TipSchema`)
    TipSchema.plugin(require('mongoose-lean-virtuals'))
    Tip = Content.discriminator('tip', TipSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = Tip
