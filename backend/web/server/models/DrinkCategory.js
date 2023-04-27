const {getDataModel}=require('../../config/config')

let DrinkCategory = null

try {
  const Category = require(`./Category`)
  if (Category) {
    const DrinkCategorySchema=require(`../plugins/${getDataModel()}/schemas/DrinkCategorySchema`)
    DrinkCategorySchema.plugin(require('mongoose-lean-virtuals'))
    DrinkCategory = Category.discriminator('drinkCategory', DrinkCategorySchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = DrinkCategory
