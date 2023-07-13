const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let CoachingQuestionSchema=null

try {
  CoachingQuestionSchema=require(`../plugins/${getDataModel()}/schemas/CoachingQuestionSchema`)
  CoachingQuestionSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = CoachingQuestionSchema ? mongoose.model('coachingQuestion', CoachingQuestionSchema) : null
