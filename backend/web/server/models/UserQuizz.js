const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let UserQuizzSchema=null

try {
  UserQuizzSchema=require(`../plugins/${getDataModel()}/schemas/UserQuizzSchema`)
  UserQuizzSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = UserQuizzSchema ? mongoose.model('userQuizz', UserQuizzSchema) : null
