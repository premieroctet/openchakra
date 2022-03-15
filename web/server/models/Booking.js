const mongoose = require('mongoose')

const BookingSchema=require('./others/BookingSchema')

module.exports = mongoose.model('booking', BookingSchema)
