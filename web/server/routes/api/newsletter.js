const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const validateNewsletterInput = require('../../validation/newsletter');
const Newsletter = require('../../models/Newsletter');

router.get('/test', (req, res) => res.json({msg: 'Newsletter Works!'}));

// @Route POST /myAlfred/api/newsletter/add
// Add email for newsletter
router.post('/add', (req, res) => {
  const {errors, isValid} = validateNewsletterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Newsletter.findOne({email: req.body.email})
    .then(newsletter => {
      if (newsletter) {
        errors.email = 'This email already exists';
        return res.status(400).json({errors});
      } else {
        const newNewsletter = new Newsletter({
          email: req.body.email,
        });

        newNewsletter.save().then(newsletter => res.json(newsletter)).catch(err => console.error(err));
      }
    });


});

// @Route GET /myAlfred/api/newsletter/all
// View all newsletter email
// @Access private
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decode = jwt.decode(token);
  const admin = decode.is_admin;

  if (admin) {
    Newsletter.find()
      .then(newsletter => {
        if (typeof newsletter !== 'undefined' && newsletter.length > 0) {
          res.json(newsletter);
        } else {
          return res.status(400).json({msg: 'No email found'});
        }

      })
      .catch(err => res.status(404).json({email: 'No email found'}));
  } else {
    res.status(400).json({msg: 'Access denied'});
  }
});

// @Route GET /myAlfred/api/newsletter/:id
// View one newsletter email
// @Access private
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decode = jwt.decode(token);
  const admin = decode.is_admin;

  if (admin) {
    Newsletter.findById(req.params.id)
      .then(newsletter => {
        if (Object.keys(newsletter).length === 0 && newsletter.constructor === Object) {
          return res.status(400).json({msg: 'No email found'});
        } else {
          res.json(newsletter);
        }

      })
      .catch(err => res.status(404).json({email: 'No email found'}));
  } else {
    res.status(400).json({msg: 'Access denied'});
  }
});

// @Route DELETE /myAlfred/api/newsletter/:id
// Delete one newsletter email
// @Access private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decode = jwt.decode(token);
  const admin = decode.is_admin;
  Newsletter.findById(req.params.id)
    .then(newsletter => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'});


      }
      newsletter.remove().then(() => res.json({success: true}));
    })
    .catch(err => res.status(404).json({newsletternotfound: 'No email found'}));
});


module.exports = router;
