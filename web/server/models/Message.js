const mongoose = require('mongoose')
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
    type: Boolean,
    default: false,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

// module.exports = Message = mongoose.model('message', MessageSchema);
module.exports = MessageSchema
