const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let BookingSchema=null

try {
  BookingSchema=require(`../plugins/${getDataModel()}/schemas/BookingSchema`)
  BookingSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = BookingSchema ? mongoose.model('booking', BookingSchema) : null
