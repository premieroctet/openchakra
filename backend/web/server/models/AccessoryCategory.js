const {getDataModel}=require('../../config/config')

let AccessoryCategory = null

try {
  const Category = require(`./Category`)
  if (Category) {
    const AccessoryCategorySchema=require(`../plugins/${getDataModel()}/schemas/AccessoryCategorySchema`)
    AccessoryCategorySchema.plugin(require('mongoose-lean-virtuals'))
    AccessoryCategory = Category.discriminator('accessoryCategory', AccessoryCategorySchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = AccessoryCategory
