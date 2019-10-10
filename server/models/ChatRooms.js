const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRoomsSchema = new Schema({
    name: String,
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    ],
    messages: [{
        sender: String,
        content: String,
        dateTime: String
    }]
});

module.exports = ChatRooms = mongoose.model('chatRooms', ChatRoomsSchema);