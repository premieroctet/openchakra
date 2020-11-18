const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const passport = require('passport');
const nodemailer = require('nodemailer');
const {sendNewMessageToAlfred, sendNewMessageToClient} = require('../../../utils/mailing');

const ChatRooms = require('../../models/ChatRooms');

// FIX : sendNewMessage de client vers Alfred en double

router.get('/test', (req, res) => res.json({msg: 'ChatRooms Works!'}));

// Get chatrooms for one user
router.get('/userChatRooms', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = mongoose.Types.ObjectId(req.user.id);
  ChatRooms.find({
    $or: [
      {
        emitter: user,
      },
      {
        recipient: user,
      },
    ],
  })
    .populate('emitter', '-id_card')
    .populate('recipient', '-id_card')
    .populate('booking', 'alfred')
    .then(chatrooms => {
      if (!chatrooms) {
        res.status(404).json({msg: 'Aucun chat trouvé'});
      }

      if (chatrooms) {
        res.json(chatrooms);
      }
    })
    .catch (err => {
      console.error(err)
      res.status(500)
    })
});

// Get one chatroom
router.get('/userChatRoom/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  ChatRooms.findById(req.params.id)
    .populate('attendees')
    .then(chatroom => {
      if (!chatroom) {
        res.status(404).json({msg: 'Aucun chat trouvé'});
      }
      if (chatroom) {
        res.json(chatroom);
      }
    })
    .catch (err => {
      console.error(err)
      res.status(500)
    })
});


// Add chatRoom and connect users to it
router.post('/addAndConnect', (req, res) => {
  const emitter = mongoose.Types.ObjectId(req.body.emitter);
  const recipient = mongoose.Types.ObjectId(req.body.recipient);
  const random = uuidv4();
  ChatRooms.findOne({attendees: {$all: [req.body.emitter, req.body.recipient]}})
    .then(users => {
      if (!users) {
        chatRoomFields = {};
        chatRoomFields.name = 'room-' + random;
        chatRoomFields.lu = req.body.lu;
        chatRoomFields.emitter = emitter;
        chatRoomFields.recipient = recipient;

        const newChat = new ChatRooms(chatRoomFields);
        newChat.save().then(chat => res.json(chat)).catch(err => console.error(err));
      }

      if (users) {
        return res.status(400).json({msg: 'chat déjà existant'});
      }
    })
    .catch(err => console.error(err));
});

router.put('/saveMessages/:id', (req, res) => {
  ChatRooms.findByIdAndUpdate(req.params.id, {
    lusender: req.body.messages.lusender,
    lurecipient: req.body.messages.lurecipient,
    messages: req.body.messages,
  }, {new: true})
    .then(chatroom => {
      if (!chatroom) {
        return res.status(404).json({msg: 'no chatroom found'});
      }
      if (chatroom) {
        Booking.findById(req.body.booking_id)
          .populate('alfred')
          .populate('user')
          .then(b => {
            const msg = chatroom.messages[chatroom.messages.length - 1];

            if (b.alfred._id.equals(msg.idsender)) {
              sendNewMessageToClient(b, req.params.id, req);
            } else {
              sendNewMessageToAlfred(b, req.params.id, req);
            }
          })
          .catch(err => console.error(err));
        return res.json();
      }
    })
    .catch(err => console.error(err));
});

router.put('/viewMessages/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  ChatRooms.findById(req.params.id)
    .then(chatroom => {
      chatroom.messages.forEach(message => {
        if (message.idsender != req.user.id) {
          message.viewed = true;
        }
      });
      chatroom.save().then(() => res.json(chatroom)).catch(err => console.error(err));
    })
    .catch(err => {
      console.error(err)
      res.status(500)
    });
});

router.get('/nonViewedMessages', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = mongoose.Types.ObjectId(req.user.id);
  ChatRooms.find({
    $or: [
      {
        emitter: user,
      },
      {
        recipient: user,
      },
    ],
  })
    .populate('emitter', '-id_card')
    .populate('recipient', '-id_card')
    .populate({
      path: 'booking',
      populate: {path: 'alfred'},
    })
    .populate({
      path: 'booking',
      populate: {path: 'user'},
    })
    .then(chatrooms => {
      let nonReadChats = [[], []];
      chatrooms.forEach(chatroom => {
        for (let i = 0; i < chatroom.messages.length; i++) {
          if (chatroom.messages[i].viewed === false && chatroom.messages[i].idsender != req.user.id) {
            if (chatroom.booking.alfred._id == req.user.id) {
              nonReadChats[0].push(chatroom);
              break;
            } else {
              nonReadChats[1].push(chatroom);
            }
          }
        }
      });
      res.status(200).json(nonReadChats);
    })
    .catch(err => console.error(err));
});

router.get('/nonViewedMessagesCount', passport.authenticate('jwt', {session: false}), (req, res) => {
  const user = mongoose.Types.ObjectId(req.user.id);
  ChatRooms.find({$or: [{emitter: user}, {recipient: user}]})
    .populate('emitter', 'id')
    .populate('recipient', 'id')
    .then(chatrooms => {
      let nonReadChats = 0;
      chatrooms.forEach(chatroom => {
        for (let i = 0; i < chatroom.messages.length; i++) {
          if (chatroom.messages[i].viewed === false && chatroom.messages[i].idsender != req.user.id) {
            nonReadChats++;
          }
        }
      });
      res.status(200).json(nonReadChats);
    })
    .catch(err => console.error(err));
});

router.put('/addBookingId/:id', (req, res) => {
  ChatRooms.findByIdAndUpdate(req.params.id, {booking: mongoose.Types.ObjectId(req.body.booking)})
    .then(chatroom => {
      if (!chatroom) {
        return res.status(404).json({msg: 'error'});
      }
      if (chatroom) {
        return res.json(chatroom);
      }
    })
    .catch(err => console.error(err));
});

module.exports = router;
