const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let MenuRecipeSchema=null

try {
  MenuRecipeSchema=require(`../plugins/${getDataModel()}/schemas/MenuRecipeSchema`)
  MenuRecipeSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = MenuRecipeSchema ? mongoose.model('menuRecipe', MenuRecipeSchema) : null
