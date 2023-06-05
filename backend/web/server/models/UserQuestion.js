const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let UserQuestionSchema=null

try {
  UserQuestionSchema=require(`../plugins/${getDataModel()}/schemas/UserQuestionSchema`)
  UserQuestionSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = UserQuestionSchema ? mongoose.model('userQuestion', UserQuestionSchema) : null
