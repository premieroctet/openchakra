const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ChatRoomSchema=null

try {
  ChatRoomSchema=require(`../plugins/${getDataModel()}/schemas/ChatRoomSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

ChatRoomSchema?.plugin(mongooseLeanVirtuals)
module.exports = ChatRoomSchema ? mongoose.model('chatRoom', ChatRoomSchema) : null
