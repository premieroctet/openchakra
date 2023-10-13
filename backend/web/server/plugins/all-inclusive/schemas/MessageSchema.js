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
    required: [true, `Le message est obligatoire`],
  },
  // Attachment URL
  attachment: {
    type: String,
  },
  is_read: {
    type: Date,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, `Le destinataire est obligatoire`],
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, `L'émetteur est obligatoire`],
  },
}, schemaOptions)

MessageSchema.methods.getPartner = function(user) {
  const userId=typeof(user)=='string' ? user : user._id.toString()
  return this.sender._id.toString()==userId ?
    this.receiver: this.sender
}

module.exports = MessageSchema
