const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let BillingSchema=null

try {
  BillingSchema=require(`../plugins/${getDataModel()}/schemas/BillingSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

BillingSchema?.plugin(mongooseLeanVirtuals)
module.exports = BillingSchema ? mongoose.model('billing', BillingSchema) : null
