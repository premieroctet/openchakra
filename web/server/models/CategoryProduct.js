const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let CategoryProductSchema=null

try {
  CategoryProductSchema=require(`./${getDataModel()}/CategoryProductSchema`)
  CategoryProductSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = CategoryProductSchema ? mongoose.model('categoryproduct', CategoryProductSchema) : null
