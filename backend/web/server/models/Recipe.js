const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let RecipeSchema=null

try {
  RecipeSchema=require(`../plugins/${getDataModel()}/schemas/RecipeSchema`)
  RecipeSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = RecipeSchema ? mongoose.model('recipe', RecipeSchema) : null
