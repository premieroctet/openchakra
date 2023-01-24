const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const {getDataModel}=require('../../config/config')

let CigarCategory = null

try {
  const Category = require(`./Category`)
  if (Category) {
    const CigarCategorySchema=require(`../plugins/${getDataModel()}/schemas/CigarCategorySchema`)
    CigarCategorySchema.plugin(mongooseLeanVirtuals)
    CigarCategory = Category.discriminator('cigarCategory', CigarCategorySchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = CigarCategory
