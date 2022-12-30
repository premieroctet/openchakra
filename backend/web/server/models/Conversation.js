const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ConversationSchema=null

try {
  ConversationSchema=require(`./${getDataModel()}/ConversationSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

ConversationSchema?.plugin(mongooseLeanVirtuals)
module.exports = ConversationSchema ? mongoose.model('conversation', ConversationSchema) : null
