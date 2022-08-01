const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let OrderSchema=null

try {
  OrderSchema=require(`./${getDataModel()}/OrderSchema`)
  OrderSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = OrderSchema ? mongoose.model('order', OrderSchema) : null
