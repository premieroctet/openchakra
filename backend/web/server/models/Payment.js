const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let PaymentSchema=null

try {
  PaymentSchema=require(`./${getDataModel()}/PaymentSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

PaymentSchema?.plugin(mongooseLeanVirtuals)
module.exports = PaymentSchema ? mongoose.model('payment', PaymentSchema) : null
