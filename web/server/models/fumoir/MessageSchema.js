const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const {schemaOptions} = require('../../utils/schemas')
const Schema = mongoose.Schema


const MessageSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  is_read: {
    type: Date,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, schemaOptions)

MessageSchema.plugin(mongooseLeanVirtuals)

module.exports = MessageSchema
