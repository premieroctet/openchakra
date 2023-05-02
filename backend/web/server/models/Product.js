const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let ProductSchema=null

try {
  ProductSchema=require(`../plugins/${getDataModel()}/schemas/ProductSchema`)
  ProductSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}
module.exports = ProductSchema ? mongoose.model('product', ProductSchema) : null
