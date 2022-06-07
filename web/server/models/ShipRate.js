const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ShipRateSchema=null

try {
  ShipRateSchema=require(`./${getDataModel()}/ShipRateSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw e
  }
}

module.exports = ShipRateSchema ? mongoose.model('shipRate', ShipRateSchema) : null
