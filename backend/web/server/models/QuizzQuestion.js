const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let QuizzQuestionSchema=null

try {
  QuizzQuestionSchema=require(`../plugins/${getDataModel()}/schemas/QuizzQuestionSchema`)
  QuizzQuestionSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = QuizzQuestionSchema ? mongoose.model('quizzQuestion', QuizzQuestionSchema) : null
