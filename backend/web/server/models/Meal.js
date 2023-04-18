const {getDataModel}=require('../../config/config')

let Meal = null

try {
  const Product = require(`./Product`)
  if (Product) {
    const MealSchema=require(`../plugins/${getDataModel()}/schemas/MealSchema`)
    MealSchema.plugin(require('mongoose-lean-virtuals'))
    Meal = Product.discriminator('meal', MealSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = Meal
