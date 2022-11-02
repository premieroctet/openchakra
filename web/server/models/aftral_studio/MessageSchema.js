const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  contents: String,
  date: Date,
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: false,
  },
  destinee_user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: false,
  },
  destinee_session: {
    type: Schema.Types.ObjectId,
    ref: 'session',
    required: false,
  },
}, {toJSON: {virtuals: true, getters: true}})


MessageSchema.virtual('sender_name').get(() => {
  return destinee_user ? destinee_user.contact_name : destinee_session.contact_name
})

module.exports = MessageSchema
