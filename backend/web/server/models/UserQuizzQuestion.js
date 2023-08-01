const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let UserQuizzQuestionsSchema=null

try {
  UserQuizzQuestionsSchema=require(`../plugins/${getDataModel()}/schemas/UserQuizzQuestionSchema`)
  UserQuizzQuestionsSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = UserQuizzQuestionsSchema ? mongoose.model('userQuizzQuestion', UserQuizzQuestionsSchema) : null
