const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const Message = require('../../models/Message');
const validateMessageInput = require('../../validation/message');

router.get('/test', (req, res) => res.json({msg: 'Message Works!'}));

// @Route POST /myAlfred/api/message/add
// Add a message
// @Access private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {

  const {isValid, errors} = validateMessageInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const messageFields = {};
  messageFields.sender = req.user.id;
  messageFields.subject = req.body.subject;
  messageFields.content = req.body.content;
  messageFields.receiver = mongoose.Types.ObjectId(req.body.receiver);

  const newMessage = new Message(messageFields);
  newMessage.save().then(message => res.json(message)).catch(err => console.error(err));
});

// @Route GET /myAlfred/api/message/all
// View all messages for the current user
// @Access private
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {

  Message.find({$or: [{sender: req.user.id}, {receiver: req.user.id}]})
    .populate('sender')
    .populate('receiver')
    .then(message => {
      if (typeof message !== 'undefined' && message.length > 0) {
        res.json(message);
      } else {
        return res.status(400).json({msg: 'No message found'});
      }


    })
    .catch(err => res.status(404).json({message: 'No message found'}));
});

// @Route GET /myAlfred/api/message/:id
// View one message
// @Access private
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Message.findById(req.params.id)
    .populate('sender')
    .populate('receiver')
    .then(message => {

      res.json(message);


    })
    .catch(err => res.status(404).json({message: 'No message found'}));


});

// @Route DELETE /myAlfred/api/message/:id
// Delete one message
// @Access private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Message.findById(req.params.id)
    .then(message => {

      message.remove().then(() => res.json({success: true}));


    })
    .catch(err => res.status(404).json({messagenotfound: 'No message found'}));
});

// @Route PUT /myAlfred/api/message/:id
// Update a message to read
// @Access private
router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Message.findByIdAndUpdate(req.params.id, {is_read: true}, {new: true})
    .then(message => {
      res.json(message);
    })
    .catch(err => res.status(404).json({messagenotfound: 'No message found'}));
});


module.exports = router;
