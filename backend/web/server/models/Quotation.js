const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let QuotationSchema=null
try {
  QuotationSchema=require(`../plugins/${getDataModel()}/schemas/QuotationSchema`)
  QuotationSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = QuotationSchema ? mongoose.model('quotation', QuotationSchema) : null
