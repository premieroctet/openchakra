const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let QuizzAnswerSchema=null

try {
  QuizzAnswerSchema=require(`../plugins/${getDataModel()}/schemas/QuizzAnswerSchema`)
  QuizzAnswerSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = QuizzAnswerSchema ? mongoose.model('quizzAnswer', QuizzAnswerSchema) : null
