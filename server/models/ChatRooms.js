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
        user: String,
        content: String,
    }]
});

module.exports = ChatRooms = mongoose.model('chatRooms', ChatRoomsSchema);