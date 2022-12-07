const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let SubscriptionSchema=null

try {
  SubscriptionSchema=require(`./${getDataModel()}/SubscriptionSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

SubscriptionSchema?.plugin(mongooseLeanVirtuals)
module.exports = SubscriptionSchema ? mongoose.model('subscription', SubscriptionSchema) : null
