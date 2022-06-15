const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PriceListSchema=null

try {
  PriceListSchema=require(`./${getDataModel()}/PriceListSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = PriceListSchema ? mongoose.model('priceList', PriceListSchema) : null
