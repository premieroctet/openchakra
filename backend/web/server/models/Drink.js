const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const {getDataModel}=require('../../config/config')

let Drink = null
try {
  const Product = require(`./Product`)
  if (Product) {
    const DrinkSchema = require(`../plugins/${getDataModel()}/schemas/DrinkSchema`)
    DrinkSchema.plugin(mongooseLeanVirtuals)
    Drink = Product.discriminator('drink', DrinkSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = Drink
