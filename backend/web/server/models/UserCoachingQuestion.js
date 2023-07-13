const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let UserCoachingQuestionSchema=null

try {
  UserCoachingQuestionSchema=require(`../plugins/${getDataModel()}/schemas/UserCoachingQuestionSchema`)
  UserCoachingQuestionSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = UserCoachingQuestionSchema ? mongoose.model('userCoachingQuestion', UserCoachingQuestionSchema) : null
