const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let QuotationDetailSchema=null
try {
  QuotationDetailSchema=require(`../plugins/${getDataModel()}/schemas/QuotationDetailSchema`)
  QuotationDetailSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = QuotationDetailSchema ? mongoose.model('quotationDetail', QuotationDetailSchema) : null
