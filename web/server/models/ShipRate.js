const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

const ShipRateSchema=require(`./${getDataModel()}/ShipRateSchema`)

module.exports = mongoose.model('shipRate', ShipRateSchema)
