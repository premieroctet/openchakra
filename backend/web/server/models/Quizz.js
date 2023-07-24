const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let QuizzSchema=null

try {
  QuizzSchema=require(`../plugins/${getDataModel()}/schemas/QuizzSchema`)
  QuizzSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = QuizzSchema ? mongoose.model('quizz', QuizzSchema) : null
