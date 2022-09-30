const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let BillingSchema=null

try {
  BillingSchema=require(`./${getDataModel()}/BillingSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  BillingSchema=require(`./others/BillingSchema`)
}

BillingSchema?.plugin(mongooseLeanVirtuals)
module.exports = BillingSchema ? mongoose.model('billing', BillingSchema) : null
