const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const {getDataModel}=require('../../config/config')

let Accessory = null

try {
  const Product = require(`./Product`)
  if (Product) {
    const AccessorySchema=require(`../plugins/${getDataModel()}/schemas/AccessorySchema`)
    AccessorySchema.plugin(mongooseLeanVirtuals)
    Accessory = Product.discriminator('accessory', AccessorySchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = Accessory
