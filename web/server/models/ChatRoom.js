const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hideIllegal} = require('../../utils/text')

const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const ChatRoomsSchema = new Schema({
  name: String,
  emitter: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  messages: [{
    user: String,
    content: {
      type: String,
      set: text => hideIllegal(text),
    },
    date: Date,
    thepicture: String,
    idsender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    viewed: {
      type: Boolean,
      default: false,
    },
  }],
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'booking',
    required: false,
  },
}, {toJSON: {virtuals: true, getters: true}})

/** Return latest message date */
ChatRoomsSchema.virtual('latest').get(function() {
  if (!this.messages || this.messages.length==0) {
    return null
  }
  return Math.max(...this.messages.map(m => m.date))
})

ChatRoomsSchema.plugin(mongooseLeanVirtuals)

module.exports = ChatRoom = mongoose.model('chatRoom', ChatRoomsSchema)
