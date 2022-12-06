const mongoose = require('mongoose')
const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const {getDataModel} = require('../../config/config')

let OrderItemSchema=null

try {
  OrderItemSchema=require(`./${getDataModel()}/OrderItemSchema`)
  OrderItemSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = OrderItemSchema ? mongoose.model('orderItem', OrderItemSchema) : null
