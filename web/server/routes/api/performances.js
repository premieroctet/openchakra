const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const moment = require('moment');

const Booking = require('../../models/Booking');
const ServiceUser = require('../../models/ServiceUser');
const Reviews = require('../../models/Reviews');
const User = require('../../models/User');

moment.locale('fr');

router.get('/test', (req, res) => res.json({msg: 'Performances Works!'}));


// @Route GET /myAlfred/performances/incomes/totalComing/:yeay
// Get coming income per year
// @Access private
router.get('/incomes/totalComing/:year', passport.authenticate('jwt', {session: false}), (req, res) => {
  const year = req.params.year;
  let total = 0;
  Booking.find({alfred: req.user.id, status: 'Confirmée', date_prestation: /year+1$/i})
    .then(booking => {

      booking.forEach(b => {
        const date = b.date_prestation.slice(6, 10);
        if (date === year) {
          total += b.amount;
        }

      });
      res.json(total);

    })
    .catch(err => res.status(404).json({booking: 'No booking found'}));
});

// @Route GET /myAlfred/performances/incomes/:year
// Get booking per year
// @Access private
router.get('/incomes/:year?/:month?', passport.authenticate('jwt', {session: false}), (req, res) => {
  const year = req.params.year;
  const month= req.params.month

  const bookings = new Array(12).fill(0)
  Object.keys(bookings).forEach( idx => bookings[idx]=[])

  const re=new RegExp(`${month==undefined ? '':month}/${year}$`)
  Booking.find({alfred: req.user.id, status: 'Terminée', date_prestation: re})
    .then(booking => {
      booking.forEach(b => {
        const date = b.date_prestation.slice(6, 10);
        if (date === year) {
          const month = b.date_prestation.slice(3, 5);
          bookings[parseInt(month)].push(b)
        }
      });
      res.json(bookings);
    })
    .catch(err => {
      res.status(404).json({booking: 'No booking found'});
    });
});


// @Route GET /myAlfred/performances/statistics/totalBookings
// Get all bookings for an alfred
// @Access private
router.get('/statistics/totalBookings', passport.authenticate('jwt', {session: false}), (req, res) => {
  let totalIncomes = 0;
  let totalPrestations = 0;
  Booking.find({alfred: req.user.id, status: 'Terminée'})
    .then(booking => {

      booking.forEach(b => {
        totalIncomes += b.alfred_amount;
        totalPrestations += b.prestations.length;

      });
      res.json({incomes: totalIncomes, prestations: totalPrestations});

    })
    .catch(err => res.status(404).json({booking: 'No booking found'}));
});

// @Route GET /myAlfred/performances/statistics/totalViewsServices
// Get all services views for an alfred
// @Access private
router.get('/statistics/totalViewsServices', passport.authenticate('jwt', {session: false}), (req, res) => {
  let totalViews = 0;
  ServiceUser.find({user: req.user.id})
    .then(service => {

      service.forEach(s => {
        totalViews += s.number_of_views;

      });
      res.json(totalViews);

    })
    .catch(err => res.status(404).json({services: 'No services found'}));
});

// @Route GET /myAlfred/performances/statistics/totalReviews
// Get reviews for an alfred
// @Access private
router.get('/statistics/totalReviews', passport.authenticate('jwt', {session: false}), (req, res) => {
  let totalReviews = 0;
  Reviews.find({alfred: req.user.id, note_client: undefined})
    .then(reviews => {

      totalReviews = reviews.length;
      res.json(totalReviews);

    })
    .catch(err => res.status(404).json({services: 'No services found'}));
});

// @Route POST /myAlfred/performances/statistics/bookings/service
// Get all incomes and prestations per service for an alfred
// @Access private
router.post('/statistics/bookings/service', passport.authenticate('jwt', {session: false}), (req, res) => {
  const service = req.body.label;
  let totalIncomes = 0;
  let totalPrestations = 0;
  Booking.find({alfred: req.user.id, status: 'Terminée', service: service})
    .then(booking => {

      booking.forEach(b => {
        totalIncomes += b.amount - b.fees;
        totalPrestations += b.prestations.length;

      });
      res.json({incomes: totalIncomes.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0], prestations: totalPrestations});

    })
    .catch(err => res.status(404).json({booking: 'No booking found'}));
});

// @Route GET /myAlfred/performances/statistics/reviews/:service
// Get reviews for a service for an alfred
// @Access private
router.get('/statistics/reviews/:service', passport.authenticate('jwt', {session: false}), (req, res) => {
  const service = req.params.service;
  let totalReviews = 0;
  Reviews.find({alfred: req.user.id, note_client: undefined, serviceUser: service})
    .then(reviews => {

      totalReviews = reviews.length;
      res.json(totalReviews);

    })
    .catch(err => res.status(404).json({services: 'No services found'}));
});

// @Route GET /myAlfred/performances/evaluations/allReviews
// Get all reviews for an alfred
// @Access private
router.get('/evaluations/allReviews', passport.authenticate('jwt', {session: false}), (req, res) => {
  Reviews.find({alfred: req.user.id, note_client: undefined})
    .populate('user', '-id_card')
    .populate('serviceUser')
    .populate({path: 'serviceUser', populate: {path: 'service'}})
    .then(reviews => {

      res.json(reviews);

    })
    .catch(err => res.status(404).json({reviews: 'No reviews found'}));
});


module.exports = router;
