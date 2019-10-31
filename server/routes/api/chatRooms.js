const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const passport = require('passport');

const ChatRooms = require('../../models/ChatRooms');

router.get('/test',(req, res) => res.json({msg: 'ChatRooms Works!'}) );

// Get chatrooms for one user
router.get('/userChatRooms', passport.authenticate('jwt',{session:false}), (req, res) => {
  const user = mongoose.Types.ObjectId(req.user.id);
  ChatRooms.find()
    .populate("emitter")
    .populate("recipient")
    .then(chatrooms => {
      if (!chatrooms) {
        res.status(404).json({msg: 'Aucun chat trouvé'})
      }

      if (chatrooms) {
        res.json(chatrooms);
      }
    })
})

// Get one chatroom
router.get('/userChatRoom/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  ChatRooms.findById(req.params.id)
    .populate("attendees")
    .then(chatroom => {
      if (!chatroom) {
        res.status(404).json({msg: 'Aucun chat trouvé'})
      }

      if (chatroom) {
        res.json(chatroom)
      }
    })
})

// Add chatRoom and connect users to it
router.post('/addAndConnect', (req, res) => {
  const emitter = mongoose.Types.ObjectId(req.body.emitter);
  const recipient = mongoose.Types.ObjectId(req.body.recipient);
  const random = uuidv4();
  ChatRooms.findOne({ attendees: {$all: [ req.body.emitter, req.body.recipient ]}})
    .then(users => {
      if (!users) {
        chatRoomFields = {};
        chatRoomFields.name = 'room-' + random;
        chatRoomFields.emitter = emitter;
        chatRoomFields.recipient = recipient;

        const newChat = new ChatRooms(chatRoomFields);
        newChat.save().then(chat => res.json(chat)).catch(err => console.log(err));
      }

      if (users) {
        return res.status(400).json({msg: 'chat déjà existant'})
      }
    })
    .catch(err => console.log(err));
})

router.put('/saveMessages/:id', (req, res) => {
  ChatRooms.findByIdAndUpdate(req.params.id, { messages: req.body.messages })
    .then(chatroom => {
      if (!chatroom) return res.status(404).json({msg: 'no chatroom found'})
      if (chatroom) return res.json();
    })
    .catch(err => console.log(err));
})

module.exports = router;