const express = require('express')
const passport = require('passport')
const moment = require('moment')
const lodash=require('lodash')
const {HTTP_CODES} = require('../../utils/errors')
const ServiceUser = require('../../models/ServiceUser')
const Booking = require('../../models/Booking')
const Review = require('../../models/Review')
const {BOOK_STATUS}=require('../../../utils/consts')

moment.locale('fr')
const router = express.Router()

router.get('/test', (req, res) => res.json({msg: 'Performances Works!'}))


// @Route GET /myAlfred/performances/incomes/totalComing/:yeay
// Get coming income per year
// @Access private
router.get('/incomes/totalComing/:year', passport.authenticate('jwt', {session: false}), (req, res) => {
  const year = req.params.year
  const now=moment().set('year', year)
  const start=moment(now).startOf('year')
  const end=moment(now).endOf('year')
  Booking.find({alfred: req.user.id, status: BOOK_STATUS.CONFIRMED, prestation_date: {$gte: start, $lte: end}})
    .then(bookings => {
      const total=lodash.sumBy(bookings, b => b.alfred_amount)
      res.json(total)

    })
    .catch(err => {
      console.error(err)
      res.status(HTTP_CODES.NOT_FOUND).json(err)
    })
})

// @Route GET /myAlfred/performances/incomes/:year
// Get booking per month
// @Access private
router.get('/incomes/:year', passport.authenticate('jwt', {session: false}), (req, res) => {
  const year = req.params.year
  const now=moment().set('year', year)
  const start=moment(now).startOf('year')
  const end=moment(now).endOf('year')
  const bookings = new Array(12).fill(0)

  Booking.find({alfred: req.user.id, status: BOOK_STATUS.FINISHED, prestation_date: {$gte: start, $lte: end}})
    .then(booking => {
      booking.forEach(b => {
        const b_month = moment(b.prestation_date).month()
        bookings[b_month]=bookings[b_month]+b.alfred_amount
      })
      res.json(bookings)
    })
    .catch(err => {
      console.error(err)
      res.status(HTTP_CODES.NOT_FOUND).json(err)
    })
})


// @Route GET /myAlfred/performances/statistics/:year/:month?
// Get statistics for a year of a month(if defined)
// @Access private
router.get('/statistics/:year/:month?', passport.authenticate('jwt', {session: false}), (req, res) => {
  let totalIncomes = 0
  let totalPrestations = 0
  let totalViews = 0
  let totalReviews = 0

  const year = req.params.year
  const month = req.params.month

  const now=moment().set('year', year)
  if (month!==undefined) {
    now.set('month', parseInt(month)-1)
  }
  const start=moment(now).startOf(month===undefined ? 'year': 'month')
  const end=moment(now).endOf(month===undefined ? 'year': 'month')

  console.log(start, end)

  Booking.find({alfred: req.user.id, status: BOOK_STATUS.FINISHED, prestation_date: {$gte: start, $lte: end}})
    .then(bookings => {
      totalIncomes=lodash.sumBy(bookings, b => b.alfred_amount)
      totalPrestations=lodash.sumBy(bookings, b => b.prestations.length)
      return ServiceUser.find({user: req.user.id})
    })
    .then(serviceusers => {
      totalViews = lodash.sumBy(serviceusers, su => su.number_of_views)
      return Review.find({alfred: req.user.id, note_client: undefined, date: {$gte: start, $lte: end}})
    })
    .then(reviews => {
      totalReviews = reviews.length
      res.json({
        incomes: totalIncomes,
        prestations: totalPrestations,
        totalViews: totalViews,
        totalReviews: totalReviews,
      })
    })
    .catch(err => {
      console.error(err)
      res.status(HTTP_CODES.NOT_FOUND).json(err)
    })
})

module.exports = router
