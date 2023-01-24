const { schemaOptions } = require('../../../utils/schemas');
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  contents: String,
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
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
}, schemaOptions)

MessageSchema.virtual('destinee_name').get(function() {
  return this.destinee_user?.contact_name || this.destinee_session?.contact_name
})

MessageSchema.virtual('sender_name').get(function() {
  return this.sender?.contact_name
})

module.exports = MessageSchema
