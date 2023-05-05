const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let RecipeIngredientSchema=null

try {
  RecipeIngredientSchema=require(`../plugins/${getDataModel()}/schemas/RecipeIngredientSchema`)
  RecipeIngredientSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = RecipeIngredientSchema ? mongoose.model('recipeIngredient', RecipeIngredientSchema) : null
