const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const {HTTP_CODES} = require('../../utils/errors')
const Booking = require('../../models/Booking')
const Review = require('../../models/Review')
const User = require('../../models/User')
const {get_logged_id} =require('../../utils/serverContext')
const {REVIEW_STATUS} = require('../../../utils/consts')

const router = express.Router()

router.get('/test', (req, res) => res.json({msg: 'Reviews Works!'}))

// @Route POST /myAlfred/api/reviews/add/alfred
// Add a review for an alfred
// @Access private
router.post('/add/alfred', passport.authenticate('jwt', {session: false}), (req, res) => {


  const reviewFields = {}
  reviewFields.user = req.user.id
  reviewFields.alfred = mongoose.Types.ObjectId(req.body.alfred)
  reviewFields.content = req.body.content
  reviewFields.serviceUser = req.body.service

  reviewFields.note_alfred = {}
  reviewFields.note_alfred.prestation_quality = req.body.prestation_quality
  reviewFields.note_alfred.quality_price = req.body.quality_price
  reviewFields.note_alfred.relational = req.body.relational

  // Compliments
  reviewFields.note_alfred.careful = req.body.careful
  reviewFields.note_alfred.punctual = req.body.punctual
  reviewFields.note_alfred.flexible = req.body.flexible
  reviewFields.note_alfred.reactive = req.body.reactive

  let quality = parseInt(req.body.quality_price)
  let prestation = parseInt(req.body.prestation_quality)
  let relational = parseInt(req.body.relational)


  reviewFields.note_alfred.global = (quality + relational + prestation) / 3

  Review.create(reviewFields)
    .then(() => {
      Booking.findByIdAndUpdate(req.body.booking, {alfred_evaluated: true})
        .then(() => res.json('ok'))
        .catch(err => {
          console.error(err)
          res.status(400).json(err)
        })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })

  User.findByIdAndUpdate(req.body.alfred, {$inc: {number_of_reviews: 1}})
    .then(() => {
      User.findById(req.body.alfred)
        .then(user => {
          const score = (quality + relational + prestation) / 3
          if (user.number_of_reviews === 1) {
            user.score = score.toFixed(2)
          }
          else {
            // FIX : mauvais calcul de moyenne
            user.score = ((user.score + score) / 2).toFixed(2)
          }
          user.save()
            .then(() => console.log('reviews update'))
            .catch(err => console.error(err))
        })
        .catch(error => {
          console.error(error)
        })
    })
    .catch(err => console.error(err))
})

// @Route POST /myAlfred/api/reviews/add/client
// Add a review for a client
// @Access private
router.post('/add/client', passport.authenticate('jwt', {session: false}), (req, res) => {

  const reviewFields = {}
  reviewFields.alfred = req.user.id
  reviewFields.user = mongoose.Types.ObjectId(req.body.client)
  reviewFields.content = req.body.content
  reviewFields.serviceUser = req.body.service

  reviewFields.note_client = {}
  reviewFields.note_client.reception = req.body.accueil
  reviewFields.note_client.accuracy = req.body.accuracy
  reviewFields.note_client.relational = req.body.relational

  let reception = parseInt(req.body.accueil)
  let accuracy = parseInt(req.body.accuracy)
  let relational = parseInt(req.body.relational)


  reviewFields.note_client.global = (reception + relational + accuracy) / 3

  Review.create(reviewFields).then(() => {
    Booking.findByIdAndUpdate(req.body.booking, {user_evaluated: true})
      .then(() => res.json('ok'))
      .catch(error => console.log(error))
  }).catch(err => console.error(err))

  User.findByIdAndUpdate(req.body.client, {
    $inc: {number_of_reviews_client: 1},
  })
    .then(() => {
      User.findById(req.body.client)
        .then(user => {
          const score = (reception + relational + accuracy) / 3
          if (user.number_of_reviews_client === 1) {
            user.score_client = score.toFixed(2)
          }
          else {
            user.score_client = ((user.score_client + score) / 2).toFixed(2)
          }
          user.save().then(users => console.log('reviews update')).catch(err => console.error(err))
        })
        .catch(error => {
          console.error(error)
        })
    },
    )
    .catch(err => console.error(err))
})

// @Route GET /myAlfred/api/reviews/:user_id
// get skills for user, returns 4 skills cumulated
// @Access private
router.get('/:user_id', (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.user_id)
  let result = {careful: 0, punctual: 0, flexible: 0, reactive: 0}
  Review.find({alfred: userId, status: REVIEW_STATUS.APPROVED})
    .then(reviews => {
      if (typeof reviews !== 'undefined' && reviews.length > 0) {
        reviews.forEach(r => {
          const note = r.note_alfred
          Object.entries(note).forEach(e => {
            const skillName = e[0]
            const skillSet = e[1]
            if (skillSet) {
              result[skillName] = result[skillName] + 1
            }
          })
        })
        res.json(result)
      }
      else {
        res.json(result)
      }
    })
    .catch(err => console.error(err) && res.status(HTTP_CODES.NOT_FOUND).json(result))
})

router.get('/profile/customerReviewsCurrent/:id', (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.id)
  const filter=get_logged_id(req)==userId ? {} : {status: REVIEW_STATUS.APPROVED}
  Review.find({alfred: userId, ...filter, note_client: undefined})
    .populate('alfred', 'firstname name email')
    .populate('user', 'firstname name email')
    .populate('serviceUser', 'service')
    .populate({path: 'serviceUser', select: 'service', populate: {path: 'service', select: 'label'}})
    .then(review => {
      res.status(200).json(review)
    })
    .catch(err => res.status(HTTP_CODES.NOT_FOUND).json(err))
})

router.get('/profile/alfredReviewsCurrent/:id', (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.id)
  const filter=get_logged_id(req)==userId ? {} : {status: REVIEW_STATUS.APPROVED}
  Review.find({user: userId, ...filter, note_alfred: undefined})
    .populate('alfred', 'firstname name email')
    .populate('user', 'firstname name email')
    .populate('serviceUser')
    .populate({path: 'serviceUser', select: 'service', populate: {path: 'service', select: 'label'}})
    .then(review => {
      res.status(200).json(review)
    })
    .catch(err => res.status(HTTP_CODES.NOT_FOUND).json(err))
})

// @Route GET /myAlfred/api/reviews/alfred/:id
// View the reviews list for one alfred
router.get('/alfred/:id', (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.id)
  const filter=get_logged_id(req)==userId ? {} : {status: REVIEW_STATUS.APPROVED}
  Review.findOne({alfred: userId, ...filter, note_client: undefined})
    .populate('alfred')
    .populate('user')
    .then(review => {
      return res.json(review)
    })
    .catch(err => res.status(HTTP_CODES.NOT_FOUND).json({reviews: 'No reviews found'}))
})

// @Route GET /myAlfred/api/reviews/:id
// View one review
// @Access private
router.get('/review/:id', (req, res) => {
  Review.findOne({_id: req.params.id, status: REVIEW_STATUS.APPROVED})
    .populate('alfred')
    .populate('user')
    .populate({path: 'serviceUser', populate: {path: 'service', select: 'label'}})
    .then(review => {
      return res.json(review)
    })
    .catch(err => res.status(HTTP_CODES.NOT_FOUND).json({reviews: 'No reviews found'}))
})


// @Route DELETE /myAlfred/reviews/:id
// Delete one review
// @Access private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Review.findById(req.params.id)
    .then(reviews => {
      reviews.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(HTTP_CODES.NOT_FOUND).json({reviewsnotfound: 'No reviews found'}))
})


module.exports = router
