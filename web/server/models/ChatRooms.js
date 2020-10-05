const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hideIllegal} = require('../../utils/text')

const ChatRoomsSchema = new Schema({
  name: String,
  emitter: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  messages: [{
    user: String,
    content: {
      type : String,
      set : text => hideIllegal(text),
    },
    date: Date,
    thepicture: String,
    idsender: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    viewed: {
      type: Boolean,
      default: false,
    },
    /*lusender: {
      type: Boolean,
      default: false
    },
    lurecipient: {
      type: Boolean,
      default: false
    }*/
  }],
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'booking',
    required: false,
  },
});

module.exports = ChatRooms = mongoose.model('chatRooms', ChatRoomsSchema);
