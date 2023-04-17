const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  subject: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  is_read: {
    type: Date,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
}, schemaOptions)

MessageSchema.methods.getPartner = function(user) {
  const userId=typeof(user)=='string' ? user : user._id.toString()
  return this.sender._id.toString()==userId ?
    this.receiver: this.sender
}

module.exports = MessageSchema
