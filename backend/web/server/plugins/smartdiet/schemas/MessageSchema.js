const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const { DUMMY_REF } = require('../../../utils/database')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Le message est obligatoire'],
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, "L'expéditeur est obligatoire"],
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required:[function(){!this.receiver && !this.group}, 'Un destinataire ou groupe est obligatoire'],
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'group',
    required:[function(){!this.receiver && !this.group}, 'Un destinataire ou groupe est obligatoire'],
  },
  attachment: {
    type: String,
    required: false,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  pins: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
}, schemaOptions)

MessageSchema.virtual('liked', DUMMY_REF).get(function() {
  return false
})

MessageSchema.virtual('pinned', DUMMY_REF).get(function() {
  return false
})

module.exports = MessageSchema
