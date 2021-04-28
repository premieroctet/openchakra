const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment');
const axios = require('axios');

const {BOOK_STATUS, EXPIRATION_DELAY} = require('../../../utils/consts')
const Booking = require('../../models/Booking');
const User = require('../../models/User');
const CronJob = require('cron').CronJob;
const {is_production, is_development} = require('../../../config/config')
const mangopay = require('mangopay2-nodejs-sdk');
const {getNextNumber, getKeyDate} = require("../../utils/booking");
const {
  sendBookingConfirmed, sendBookingExpiredToAlfred, sendBookingExpiredToClient, sendBookingInfosRecap,
  sendBookingDetails, sendNewBooking, sendBookingRefusedToClient, sendBookingRefusedToAlfred, sendBookingCancelledByClient,
  sendBookingCancelledByAlfred, sendAskInfoPreapproved, sendAskingInfo, sendNewBookingManual,
  sendLeaveCommentForClient, sendLeaveCommentForAlfred,
} = require('../../utils/mailing');
const {get_role} = require('../../utils/serverContext')
const {payAlfred} = require('../../utils/mangopay');

moment.locale('fr');

router.get('/test', (req, res) => res.json({msg: 'Booking Works!'}));

// @Route GET /myAlfred/api/booking/alfredBooking
router.get('/alfredBooking', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userId = mongoose.Types.ObjectId(req.user.id);
  Booking.find({alfred: userId})
    .sort([['date', -1]])
    .populate('user', ['name', 'firstname', 'picture', 'company'])
    .populate('chatroom')
    .then(alfred => {
      if (!alfred) {
        res.status(404).json({msg: 'No booking found'});
      }

      if (alfred) {
        res.json(alfred);
      }
    });
});

router.get('/userBooking', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userId = mongoose.Types.ObjectId(req.user.id);
  Booking.find({user: userId})
    .sort([['date', -1]])
    .populate('alfred', '-id_card')
    .populate({
      path: 'chatroom',
      populate: {path: 'emitter'},
    })
    .populate({
      path: 'chatroom',
      populate: {path: 'recipient'},
    })
    .then(alfred => {
      if (!alfred) {
        res.status(404).json({msg: 'No booking found'});
      }

      if (alfred) {
        res.json(alfred);
      }
    });
});

router.get('/confirmPendingBookings', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userId = mongoose.Types.ObjectId(req.user.id);
  Booking.find({
    $and: [
      {
        $or: [
          {
            user: userId,
          },
          {
            alfred: userId,
          },
        ],
      },
      {
        status: BOOK_STATUS.PREAPPROVED,
      },
    ],
  })
    .then(booking => {
      booking.forEach(b => {
        if (!moment(b.date).isBetween(moment(b.date), moment(b.date).add(1, 'd'))) {
          Booking.findByIdAndUpdate(b._id, {status: BOOK_STATUS.EXPIRED}, {new: true})
            .then(newB => {
              res.json(newB);
            });
        }
      });
    })
    .catch(err => console.error(err));
});

router.get('/endConfirmedBookings', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userId = mongoose.Types.ObjectId(req.user.id);
  Booking.find({
    $and: [
      {$or: [{user: userId}, {alfred: userId}]},
      {status: BOOK_STATUS.CONFIRMED},
    ],
  })
    .then(booking => {
      booking.forEach(b => {
        const date = moment(b.end_date, 'YYYY-MM-DD').toDate();
        const hourNow = new Date().getHours();

        const hourBooking = parseInt(b.end_time.slice(0, 2));
        if (moment().isAfter(date)) {
          if (hourNow >= hourBooking) {
            Booking.findByIdAndUpdate(b._id, {status: BOOK_STATUS.FINISHED}, {new: true})
              .then(newB => {
                res.json(newB);
              });
          }
        }
      });
    });
});


router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {

  const random = crypto.randomBytes(Math.ceil(5 / 2)).toString('hex').slice(0, 5);

  const bookingFields = {};
  bookingFields.reference = req.body.reference + '_' + random;
  bookingFields.service = req.body.service;
  if (req.body.option) {
    bookingFields.option = req.body.option;
  }
  bookingFields.address = req.body.address;
  bookingFields.equipments = req.body.equipments;
  bookingFields.amount = req.body.amount;
  bookingFields.alfred = mongoose.Types.ObjectId(req.body.alfred);
  bookingFields.user = mongoose.Types.ObjectId(req.body.user);
  bookingFields.chatroom = mongoose.Types.ObjectId(req.body.chatroom);
  bookingFields.date_prestation = req.body.date_prestation;
  bookingFields.time_prestation = moment(req.body.time_prestation);
  bookingFields.prestations = req.body.prestations;
  bookingFields.fees = req.body.fees;
  bookingFields.travel_tax = req.body.travel_tax;
  bookingFields.pick_tax = req.body.pick_tax;
  bookingFields.status = req.body.status;
  bookingFields.serviceUserId = req.body.serviceUserId;
  bookingFields.cesu_amount = req.body.cesu_amount;
  bookingFields.user_role = get_role(req)

  const newBooking = new Booking(bookingFields);


  newBooking.save()
    .then(booking => {
      if (booking.status == BOOK_STATUS.INFO || booking.status == BOOK_STATUS.TO_CONFIRM) {
        // Reload to get user,alfred,service
        Booking.findById(booking._id)
          .populate('alfred')
          .populate('user')
          .then(book => {
            if (booking.status == BOOK_STATUS.INFO) {
              sendBookingInfosRecap(book);
              sendAskingInfo(book, req);
            }
            if (booking.status == BOOK_STATUS.TO_CONFIRM) {
              sendBookingDetails(book);
              sendNewBookingManual(book, req);
            }
            if (booking.status == BOOK_STATUS.CONFIRMED) {
              sendNewBooking(book, req);
            }
          })
          .catch(err => {
            console.error(err)
          })
      }
      console.log(booking);
      res.json(booking);
    })
    .catch(err => {
      console.error(err)
      res.status(404)
    })
});

// @Route GET /myAlfred/api/booking/all
// View all booking
// @Access private
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {

  Booking.find()
    .populate('alfred')
    .populate('user')
    .populate('prestation')
    .then(booking => {
      if (typeof booking !== 'undefined' && booking.length > 0) {
        res.json(booking);
      } else {
        return res.status(400).json({msg: 'No booking found'});
      }
    })
    .catch(err => res.status(404).json({booking: 'No booking found'}));
});

// @Route GET /myAlfred/booking/myBooking
// View all the booking for the current user
// @Access private
router.get('/myBooking', passport.authenticate('jwt', {session: false}), (req, res) => {
  Booking.find({$or: [{alfred: req.user.id}, {user: req.user.id}]})
    .populate('alfred')
    .populate('user')
    .populate('prestation')
    .then(booking => {
      if (booking) {
        res.json(booking);
      } else {
        return res.status(400).json({msg: 'No booking found'});
      }


    })
    .catch(err => console.error(err));

});

// @Route GET /myAlfred/api/booking/currentAlfred
// View all the booking for the current alfred
// @Access private
router.get('/currentAlfred', passport.authenticate('jwt', {session: false}), (req, res) => {
  Booking.find({alfred: req.user.id})
    .populate('alfred', {path: 'picture'})
    .populate('user')
    .populate('prestation')
    .then(booking => {
      if (booking) {
        res.json(booking);
      } else {
        return res.status(400).json({msg: 'No booking found'});
      }
    })
    .catch(err => console.error(err));

});

// @Route GET /myAlfred/api/booking/last/:id
// View 3 last booking for shop page
router.get('/last/:id', (req, res) => {
  Booking.find({alfred: req.params.id, status: BOOK_STATUS.FINISHED}, {}, {sort: {'date': -1}}).limit(3)
    .populate('alfred', '-id_card')
    .populate('user', '-id_card')
    .populate('prestation')
    .populate({path: 'prestation', populate: {path: 'service'}})
    .then(booking => {
      if (booking) {
        res.json(booking);
      } else {
        return res.status(400).json({msg: 'No booking found'});
      }


    })
    .catch(err => console.error(err));

});

// GET /myAlfred/api/booking/getPaid
// Get all booking paid for an alfred
// @access private
router.get('/getPaid', passport.authenticate('jwt', {session: false}), (req, res) => {
  Booking.find({alfred: req.user.id, paid: true})
    .populate('user', '-id_card')
    .then(booking => {
      res.json(booking);
    })
    .catch(err => console.error(err));
});

// GET /myAlfred/api/booking/getPaidSoon
// Get all booking paid soon for an alfred
// @access private
router.get('/getPaidSoon', passport.authenticate('jwt', {session: false}), (req, res) => {
  Booking.find({alfred: req.user.id, paid: false, status: BOOK_STATUS.CONFIRMED})
    .populate('user', '-id_card')
    .then(booking => {
      res.json(booking);
    })
    .catch(err => console.error(err));
});

// GET /myAlfred/api/booking/account/paid
// Get all booking paid  for a user
// @access private
router.get('/account/paid', passport.authenticate('jwt', {session: false}), (req, res) => {
  Booking.find({user: req.user.id, paid: true})
    .populate('alfred', '-id_card')
    .then(booking => {
      res.json(booking);
    })
    .catch(err => console.error(err));
});

// GET /myAlfred/api/booking/account/paidSoon
// Get all booking paid soon for a user
// @access private
router.get('/account/paidSoon', passport.authenticate('jwt', {session: false}), (req, res) => {
  Booking.find({user: req.user.id, paid: false, status: BOOK_STATUS.CONFIRMED})
    .populate('alfred', '-id_card')
    .then(booking => {
      res.json(booking);
    })
    .catch(err => console.error(err));
});

// @Route GET /myAlfred/booking/:id
// View one booking
// @Access private
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Booking.findById(req.params.id)
    .populate('alfred', '-id_card')
    .populate('user', '-id_card')
    .populate('prestation')
    .populate('equipments')
    .then(booking => {
      if (booking) {
        res.json(booking);
      } else {
        return res.status(400).json({msg: 'No booking found'});
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500)
    })
});


// @Route DELETE /myAlfred/booking/:id
// Delete one booking
// @Access private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Booking.findById(req.params.id)
    .then(message => {
      message.remove().then(() => res.json({success: true}));
    })
    .catch(err => res.status(404).json({bookingnotfound: 'No booking found'}));
});

router.put('/modifyBooking/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const obj = {status: req.body.status};
  const canceller_id = req.body.user;
  if (req.body.end_date) {
    obj.end_date = req.body.end_date;
  }
  if (req.body.end_time) {
    obj.end_time = req.body.end_time;
  }

  console.log(`Setting booking status:${req.params.id} to ${JSON.stringify(obj)}`)
  Booking.findByIdAndUpdate(req.params.id, obj, {new: true})
    .populate('alfred')
    .populate('user')
    .populate('prestation')
    .populate('equipments')
    .then(booking => {
      if (!booking) {
        return res.status(404).json({msg: 'no booking found'});
      }
      if (booking) {
        if (booking.status == BOOK_STATUS.TO_CONFIRM) {
          sendBookingDetails(booking);
          sendNewBookingManual(booking, req);
        }
        if (booking.status == BOOK_STATUS.CONFIRMED) {
          sendBookingConfirmed(booking);
        }
        if (booking.status == BOOK_STATUS.REFUSED) {
          if (canceller_id == booking.user._id) {
            sendBookingRefusedToAlfred(booking, req);
          } else {
            sendBookingRefusedToClient(booking, req);
          }
        }
        if (booking.status == BOOK_STATUS.PREAPPROVED) {
          sendAskInfoPreapproved(booking, req);
        }
        if (booking.status == BOOK_STATUS.CANCELED) {
          if (canceller_id == booking.user._id) {
            sendBookingCancelledByClient(booking);
          } else {
            sendBookingCancelledByAlfred(booking, req);
          }
        }
        return res.json(booking);
      }
    })
    .catch(err => console.error(err));
});

// Handle confirmated and after end date => to terminate
new CronJob('0 */15 * * * *', function () {
  console.log('Checking bookings to terminate');
  const date = moment().startOf('day');
  Booking.find({status: BOOK_STATUS.CONFIRMED, paid: false})
    .populate('user')
    .populate('alfred')
    .catch(err => console.error(err))
    .then(booking => {
      booking.forEach(b => {
        const end_date = moment(b.end_date, 'DD-MM-YYYY').add(1, 'days').startOf('day');
        if (moment(date).isSameOrAfter(end_date)) {
          console.log(`Booking finished:${b._id}`);
          b.billing_number = getNextNumber(Booking.find({
            billing_number: {
              type: 'billing',
              key: getKeyDate()
            }
          }));
          b.receipt_number = getNextNumber(Booking.find({
            receipt_number: {
              type: 'receipt',
              key: getKeyDate()
            }
          }));

          b.myalfred_billing_number = getNextNumber(Booking.find({
            myalfred_billing_number: {
              type: 'myalfred_billing',
              key: getKeyDate()
            }
          }));
          ;

          b.status = BOOK_STATUS.FINISHED
          b.save()
            .then(b => {
              sendLeaveCommentForAlfred(b);
              sendLeaveCommentForClient(b);
            })
            .catch(err => console.error(err));
        }
      });
    });
}, null, true, 'Europe/Paris');

// Handle terminated but not paid bookings
new CronJob('0 */15 * * * *', function () {
  console.log(`Checking bookings to pay`)
  const date = moment().startOf('day');
  Booking.find({status: BOOK_STATUS.FINISHED, paid: false})
    .populate('user')
    .populate('alfred')
    .then(bookings => {
      bookings.forEach(booking => {
        console.log(`Booking to pay:${booking._id}`);
        payAlfred(booking);
      });
    });
}, null, true, 'Europe/Paris');

// Expiration réervation en attente de confirmation :
// - soit EXPIRATION_DELAY jours après la date de création de la réservation
// - soit après la date de prestation
new CronJob('0 */15 * * * *', function () {
  console.log(`Checking expired bookings`)
  const currentDate = moment().startOf('day');
  Booking.find({status: BOOK_STATUS.TO_CONFIRM})
    .populate('user')
    .populate('alfred')
    .then(booking => {
      booking.forEach(b => {
        const expirationDate = moment(b.date).add(EXPIRATION_DELAY, 'days').startOf('day');
        // Expired because Alfred did not answer
        const answerExpired = moment(currentDate).isSameOrAfter(expirationDate)
        // Expired because prestation date passed
        const prestaDateExpired = moment().isSameOrAfter(b.date_prestation_moment)
        if (answerExpired || prestaDateExpired) {
          const reason = answerExpired ? `Alfred did not confirm within ${EXPIRATION_DELAY} days` : 'prestation date passed'
          console.log(`Booking ${b._id} expired : ${reason}`);
          b.status = BOOK_STATUS.EXPIRED
          b.save()
            .then(b => {
              sendBookingExpiredToAlfred(b);
              sendBookingExpiredToClient(b);
            })
            .catch();
        }
      });
    });
}, null, true, 'Europe/Paris');

// pattern reference
// premiere lettre nom user +  premiere lettre prenom user + premiere lettre nom alfred +  premiere lettre prenom alfred + date + 5 random
// LJBG_2242019_a5fr1


module.exports = router;
