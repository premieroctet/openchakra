const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Le message est obligatoire'],
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, "L'émetteur est obligatoire"],
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'group',
    required: [true, 'Le groupe est obligatoire'],
  },
  document: {
    type: String,
    required: false,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
}, schemaOptions)

module.exports = MessageSchema
