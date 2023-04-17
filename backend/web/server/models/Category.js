const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let CategorySchema=null

try {
  CategorySchema=require(`../plugins/${getDataModel()}/schemas/CategorySchema`)
  CategorySchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = CategorySchema ? mongoose.model('category', CategorySchema) : null
