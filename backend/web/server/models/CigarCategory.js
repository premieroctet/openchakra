const {getDataModel}=require('../../config/config')

let CigarCategory = null

try {
  const Category = require(`./Category`)
  if (Category) {
    const CigarCategorySchema=require(`../plugins/${getDataModel()}/schemas/CigarCategorySchema`)
    CigarCategorySchema.plugin(require('mongoose-lean-virtuals'))
    CigarCategory = Category.discriminator('cigarCategory', CigarCategorySchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = CigarCategory
