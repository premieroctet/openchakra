const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const Schema = mongoose.Schema

const ConversationSchema = new Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'message',
  }],
},
schemaOptions)

module.exports=ConversationSchema
