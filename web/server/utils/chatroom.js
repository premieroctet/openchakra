const uuidv4 = require('uuid/v4')
const ChatRoom=require('../models/ChatRoom')

const upsertChatroom = (userId, alfredId) => {
  const roomName=`room-${uuidv4()}`
  return ChatRoom.findOneAndUpdate(
    {$or: [{emitter: userId, recipient: alfredId}, {emitter: alfredId, recipient: userId}]},
    {$setOnInsert: {name: roomName}},
    {new: true, upsert: true},
  )
}

const addMessage = (userId, alfredId, message) => {
  return ChatRoom.findOneAndUpdate(
    {$or: [{emitter: userId, recipient: alfredId}, {emitter: alfredId, recipient: userId}]},
    {$addToSet: {messages: message}},
    {new: true})
}

module.exports={upsertChatroom, addMessage}
