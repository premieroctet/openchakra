const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let OrderItemSchema=null

try {
  OrderItemSchema=require(`../plugins/${getDataModel()}/schemas/OrderItemSchema`)
  OrderItemSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = OrderItemSchema ? mongoose.model('orderItem', OrderItemSchema) : null
