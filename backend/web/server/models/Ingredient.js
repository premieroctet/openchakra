const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let IngredientSchema=null

try {
  IngredientSchema=require(`../plugins/${getDataModel()}/schemas/IngredientSchema`)
  IngredientSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = IngredientSchema ? mongoose.model('ingredient', IngredientSchema) : null
