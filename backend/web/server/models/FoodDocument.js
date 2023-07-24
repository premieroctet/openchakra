const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let FoodDocumentSchema=null

try {
  FoodDocumentSchema=require(`../plugins/${getDataModel()}/schemas/FoodDocumentSchema`)
  FoodDocumentSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = FoodDocumentSchema ? mongoose.model('foodDocument', FoodDocumentSchema) : null
