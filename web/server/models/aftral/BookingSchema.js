const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const BaseBookingsSchema = require('../others/BookingSchema')

BaseBookingsSchema.plugin(mongooseLeanVirtuals)

module.exports = BaseBookingsSchema
