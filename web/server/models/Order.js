const {getDataModel} = require('../../config/config')
const mongoose = require('mongoose')

const OrderSchema=require(`./${getDataModel()}/OrderSchema`)

module.exports = mongoose.model('order', OrderSchema)
