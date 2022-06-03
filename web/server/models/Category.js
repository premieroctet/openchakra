const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let CategorySchema=null

try {
  CategorySchema=require(`./${getDataModel()}/CategorySchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw e
  }
}

module.exports = CategorySchema ? mongoose.model('category', CategorySchema) : null
