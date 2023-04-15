const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ConversationSchema=null

try {
  ConversationSchema=require(`../plugins/${getDataModel()}/schemas/ConversationSchema`)
  ConversationSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ConversationSchema ? mongoose.model('conversation', ConversationSchema) : null
