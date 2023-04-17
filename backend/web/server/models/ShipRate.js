const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ShipRateSchema=null

try {
  ShipRateSchema=require(`../plugins/${getDataModel()}/schemas/ShipRateSchema`)
  ShipRateSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ShipRateSchema ? mongoose.model('shipRate', ShipRateSchema) : null
