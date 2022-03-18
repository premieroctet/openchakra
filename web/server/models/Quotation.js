const {getDataModel} = require('../../config/config')
const mongoose = require('mongoose')

const QuotationSchema=require(`./${getDataModel()}/QuotationSchema`)

module.exports = mongoose.model('quotation', QuotationSchema)
