const {getDataModel}=require('../../config/config')

let Module = null

try {
  const Content = require(`./Content`)
  if (Content) {
    const ModuleSchema=require(`../plugins/${getDataModel()}/schemas/ModuleSchema`)
    ModuleSchema.plugin(require('mongoose-lean-virtuals'))
    Module = Content.discriminator('module', ModuleSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = Module
