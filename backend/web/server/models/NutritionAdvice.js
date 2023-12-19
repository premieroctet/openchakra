const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let NutritionAdviceSchema=null

try {
  NutritionAdviceSchema=require(`../plugins/${getDataModel()}/schemas/NutritionAdviceSchema`)
  NutritionAdviceSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = NutritionAdviceSchema ? mongoose.model('nutritionAdvice', NutritionAdviceSchema) : null
