const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const Schema = mongoose.Schema

const ConversationSchema = new Schema({
  users: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }],
    required: [value => value.length==2, `Les deux tuilisateurs sont requis`]
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
},
schemaOptions)

ConversationSchema.virtual('messages', {
  ref: 'message',
  localField: '_id',
  foreignField: 'conversation',
})


module.exports=ConversationSchema
