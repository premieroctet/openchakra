const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ShipRateSchema=null

try {
  ShipRateSchema=require(`./${getDataModel()}/ShipRateSchema`)
  ShipRateSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ShipRateSchema ? mongoose.model('shipRate', ShipRateSchema) : null
