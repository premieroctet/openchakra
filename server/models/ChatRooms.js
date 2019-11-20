const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRoomsSchema = new Schema({
    name: String,
    emitter: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    messages: [{
        user: String,
        content: String,
        date: Date,
        thepicture: String,
        idsender: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        lusender: {
          type: Boolean,
          default: false
        },
        lurecipient: {
          type: Boolean,
          default: false
        }
    }]
});

module.exports = ChatRooms = mongoose.model('chatRooms', ChatRoomsSchema);