const mongoose = require('mongoose')
const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const {getDataModel} = require('../../config/config')

let QuotationSchema=null
try {
  QuotationSchema=require(`./${getDataModel()}/QuotationSchema`)
  QuotationSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = QuotationSchema ? mongoose.model('quotation', QuotationSchema) : null
