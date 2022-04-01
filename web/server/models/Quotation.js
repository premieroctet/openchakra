const {getDataModel} = require('../../config/config')
const mongoose = require('mongoose')

let QuotationSchema=null
try {
  QuotationSchema=require(`./${getDataModel()}/QuotationSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = QuotationSchema ? mongoose.model('quotation', QuotationSchema) : null
