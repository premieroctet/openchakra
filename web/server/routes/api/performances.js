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
  Booking.find({alfred: req.user.id, status: 'Confirmée', date_prestation: /year$/i})
    .then(booking => {
      booking.forEach(b => {
        total += b.amount;
      });
      res.json(total);

    })
    .catch(err => res.status(404).json({booking: 'No booking found'}));
});

// @Route GET /myAlfred/performances/incomes/:year
// Get booking per month
// @Access private
router.get('/incomes/:year?/:month?', passport.authenticate('jwt', {session: false}), (req, res) => {
  const year = req.params.year;
  const month= req.params.month

  const bookings = new Array(12).fill(0)

  const re=new RegExp(`${month==undefined ? '':month}/${year}$`)
  Booking.find({alfred: req.user.id, status: 'Terminée', date_prestation: re})
    .then(booking => {
      booking.forEach(b => {
        const b_month = b.date_prestation.slice(3, 5)
        bookings[parseInt(b_month-1)]=bookings[parseInt(b_month-1)]+b.alfred_amount
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
router.get('/statistics/:year/:month?', passport.authenticate('jwt', {session: false}), (req, res) => {
  let totalIncomes = 0;
  let totalPrestations = 0;
  let totalViews = 0;
  let totalReviews = 0;

  const year = parseInt(req.params.year)
  const month = req.params.month

  const re=new RegExp(`${month==undefined ? '':month}/${year}$`)

  Booking.find({alfred: req.user.id, status: 'Terminée', date_prestation: re})
    .then(booking => {
      booking.forEach(b => {
        totalIncomes += b.alfred_amount;
        totalPrestations += b.prestations.length;
      })
      ServiceUser.find({user: req.user.id})
        .then(service => {
          service.forEach(s => {
            totalViews += s.number_of_views;
          })
          Reviews.find({alfred: req.user.id, note_client: undefined})
            .then(reviews => {
              reviews = reviews.filter( r => {
                return r.date.getFullYear()==year && (month==undefined || parseInt(month)==r.date.getMonth())
              })
              totalReviews = reviews.length;
              res.json({
                incomes: totalIncomes,
                prestations: totalPrestations,
                totalViews: totalViews,
                totalReviews: totalReviews
              })
            })

        })
      })
      .catch(err => res.status(404).json({booking: 'No booking found'}))
})

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
