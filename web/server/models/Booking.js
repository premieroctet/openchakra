const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let BookingSchema=null

try {
  BookingSchema=require(`./${getDataModel()}/BookingSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

BookingSchema?.plugin(mongooseLeanVirtuals)
module.exports = BookingSchema ? mongoose.model('booking', BookingSchema) : null
