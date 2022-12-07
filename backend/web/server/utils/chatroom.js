const uuidv4 = require('uuid/v4')
const ChatRoom=require('../models/ChatRoom')

const upsertChatroom = (userId, alfredId, booking) => {
  const roomName=`room-${uuidv4()}`
  return ChatRoom.findOneAndUpdate(
    {$and: [
      {booking: booking._id},
      {$or: [{emitter: userId, recipient: alfredId}, {emitter: alfredId, recipient: userId}]},
    ]},
    {$setOnInsert: {name: roomName, emitter: userId, recipient: alfredId}},
    {new: true, upsert: true},
  )
}

const addMessage = (userId, alfredId, message, booking=null) => {
  return ChatRoom.findOneAndUpdate(
    {$or: [{emitter: userId, recipient: alfredId}, {emitter: alfredId, recipient: userId}]},
    {$addToSet: {messages: message}, $set: {booking: booking}},
    {new: true})
}

module.exports={upsertChatroom, addMessage}
