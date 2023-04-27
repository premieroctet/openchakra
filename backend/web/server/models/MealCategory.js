const {getDataModel}=require('../../config/config')

let MealCategory = null

try {
  const Category = require(`./Category`)
  if (Category) {
    const MealCategorySchema = require(`../plugins/${getDataModel()}/schemas/MealCategorySchema`)
    MealCategorySchema.plugin(require('mongoose-lean-virtuals'))
    MealCategory = Category.discriminator('mealCategory', MealCategorySchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = MealCategory
