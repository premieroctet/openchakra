const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PriceListSchema=null

try {
  PriceListSchema=require(`../plugins/${getDataModel()}/schemas/PriceListSchema`)
  PriceListSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = PriceListSchema ? mongoose.model('priceList', PriceListSchema) : null
