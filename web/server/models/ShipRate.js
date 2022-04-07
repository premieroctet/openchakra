const {getDataModel} = require('../../config/config')
const mongoose = require('mongoose')

const ShipRateSchema=require(`./${getDataModel()}/ShipRateSchema`)

module.exports = mongoose.model('shipRate', ShipRateSchema)
