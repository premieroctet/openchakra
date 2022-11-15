const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ChatRoomSchema=null

try {
  ChatRoomSchema=require(`./${getDataModel()}/ChatRoomSchema`)
}
catch(err) {
  ChatRoomSchema=null
}

ChatRoomSchema?.plugin(mongooseLeanVirtuals)
module.exports = ChatRoomSchema ? mongoose.model('chatRoom', ChatRoomSchema) : null
