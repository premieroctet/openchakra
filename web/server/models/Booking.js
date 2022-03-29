const {getDataModel} = require('../../config/config')
const mongoose = require('mongoose')

let BookingSchema=null

try {
  BookingSchema=require(`./${getDataModel()}/BookingSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw e
  }
}

module.exports = BookingSchema ? mongoose.model('booking', BookingSchema) : null
