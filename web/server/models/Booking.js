const {getDataModel} = require('../../config/config')
const mongoose = require('mongoose')

const BookingSchema=require(`./${getDataModel()}/BookingSchema`)

module.exports = mongoose.model('booking', BookingSchema)
