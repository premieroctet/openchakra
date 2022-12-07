const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let ProductSchema=null

try {
  ProductSchema=require(`./${getDataModel()}/ProductSchema`)
  ProductSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = ProductSchema ? mongoose.model('product', ProductSchema) : null
