const express = require('express')
const ics=require('ics')
const {googleCalendarEventUrl} = require('google-calendar-url')
const mongoose = require('mongoose')
const passport = require('passport')
const moment = require('moment')

const CronJob = require('cron').CronJob
const {addMessage}=require('../../utils/chatroom')
const {NotFoundError}=require('../../utils/errors')
const {createBooking}=require('../../utils/booking')
const {HTTP_CODES} = require('../../utils/errors')
const {getHostUrl} = require('../../../config/config')
const Booking = require('../../models/Booking')
const ServiceUser = require('../../models/ServiceUser')
const Company = require('../../models/Company')
const User = require('../../models/User')
const {BOOK_STATUS, EXPIRATION_DELAY, AVOCOTES_COMPANY_NAME} = require('../../../utils/consts')
const {payBooking} = require('../../utils/mangopay')
const {
  sendBookingConfirmed, sendBookingExpiredToAlfred, sendBookingExpiredToClient, sendBookingInfosRecap,
  sendBookingDetails, sendNewBooking, sendBookingRefusedToClient, sendBookingRefusedToAlfred, sendBookingCancelledByClient,
  sendBookingCancelledByAlfred, sendAskInfoPreapproved, sendAskingInfo, sendNewBookingManual,
  sendLeaveCommentForClient, sendLeaveCommentForAlfred, sendAlert, sendBillingToAlfred,
} = require('../../utils/mailing')
const {get_logged_id} = require('../../utils/serverContext')
const {validateAvocotesCustomer}=require('../../validation/simpleRegister')
const validateBooking=require('../../validation/booking')
const {computeBookingReference, formatAddress}=require('../../../utils/text')
const {createMangoClient}=require('../../utils/mangopay')
const {stateMachineFactory} = require('../../utils/BookingStateMachine')
const router = express.Router()

moment.locale('fr')

router.get('/test', (req, res) => res.json({msg: 'Booking Works!'}))

// @Route GET /myAlfred/api/booking/alfredBooking
router.get('/alfredBooking', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userId = mongoose.Types.ObjectId(req.user.id)
  Booking.find({alfred: userId})
    .sort([['date', -1]])
    .populate('user', ['name', 'firstname', 'picture', 'company'])
    .populate('alfred', '-id_card')
    .populate('chatroom')
    .then(alfred => {
      if (!alfred) {
        res.status(HTTP_CODES.NOT_FOUND).json({msg: 'No booking found'})
      }

      if (alfred) {
        res.json(alfred)
      }
    })
})

router.get('/userBooking', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userId = mongoose.Types.ObjectId(req.user.id)
  Booking.find({user: userId})
    .sort([['date', -1]])
    .populate('alfred', '-id_card')
    .populate('user', '-id_card')
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
        res.status(HTTP_CODES.NOT_FOUND).json({msg: 'No booking found'})
      }

      if (alfred) {
        res.json(alfred)
      }
    })
})

router.get('/confirmPendingBookings', passport.authenticate('jwt', {session: false}), (req, res) => {
  const userId = mongoose.Types.ObjectId(req.user.id)
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
              res.json(newB)
            })
        }
      })
    })
    .catch(err => console.error(err))
})

/**
 @Route POST /myAlfred/api/booking/
 Add a new booking
 Body:
   serviceUserId: serviceUser
   location: in ALL_LOCATIONS
   prestations: {prestation_id: count} //
   cpf: true or false
   date: booking date
   customerBooking: linked service booking
   informationRequest: [true|false] info request or actual booking
Returns: {
  redirectURL: url to redirect to,
  extraURLs: [], supplemntary URLs to open in new tabs
}
 @Access private
 */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  validateBooking(req.body)
    .then(() => {
      return createBooking({customer: req.user, ...req.body})
    })
    .then(booking => {
      // Reload to get user,alfred,service
      return Booking.findById(booking._id)
        .populate('alfred')
        .populate('user')
        .then(book => {
          if (booking.status === BOOK_STATUS.INFO) {
            sendBookingInfosRecap(book, req)
            sendAskingInfo(book, req)
          }
          if (booking.status === BOOK_STATUS.TO_CONFIRM) {
            sendBookingDetails(book)
            sendNewBookingManual(book, req)
          }
          if (booking.status === BOOK_STATUS.CONFIRMED) {
            sendNewBooking(book, req)
          }
          // Si user et alfred définis, ajouter un message dans le chatroom
          if (book.user && book.alfred) {
            const msg=`${booking.status==BOOK_STATUS.INFO ? "Demande d'informations:" : 'Réservation:'} service ${book.service} de ${book.alfred.firstname} pour ${book.user.firstname}`
            const message={
              user: book.user.firstname,
              content: msg,
              date: moment(),
              idsender: book.user._id,
            }
            addMessage(book.user._id, book.alfred._id, message, booking)
              .then(() => console.log(`Chatroom message added`))
              .catch(err => console.error(err))
          }
          return book
        })
    })
    .then(booking => {
      const returnURLs={
        redirectURL:
        booking.status==BOOK_STATUS.INFO ? `/profile/messages?user=${booking.user._id}&relative=${booking.alfred._id}`
          :booking.amount==0 ?
            '/reservations/reservations'
            : `/confirmPayment?booking_id=${booking._id}`,
      }
      if (booking.cpf_link) {
        returnURLs.extraURLs=[booking.cpf_link]
      }
      return res.json(returnURLs)
    })
    .catch(err => {
      console.error(err)
      res.status(err.status || HTTP_CODES.SYSTEM_ERROR).json(err.message || err)
    })
})

// @Route PUT /myAlfred/api/booking/:id/item
// Add item to a booking
// @Access private
router.put('/:id/item', passport.authenticate('jwt', {session: false}), (req, res) => {

  const booking_id=req.params.id
  const item=req.body

  Booking.findByIdAndUpdate(booking_id, {$push: {items: item}}, {runValidators: true})
    .then(result => {
      if (!result) {
        console.error(`No booking #${booking_id}`)
        return Promise.reject(`No booking #${booking_id}`)
      }
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route PUT /myAlfred/api/booking/:id/item
// Removes item from a booking
// @Access private
router.delete('/:booking_id/item/:item_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  const booking_id=req.params.booking_id
  const item_id=req.params.item_id

  Booking.findByIdAndUpdate(booking_id, {$pull: {items: {_id: item_id}}}, {runValidators: true})
    .then(() => {
      res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

// @Route GET /myAlfred/api/booking/all
// View all booking
// @Access private
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {

  Booking.find()
    .populate('alfred')
    .populate('user')
    .populate('prestation')
    .populate({path: 'customer_booking', populate: {path: 'user'}})
    .then(booking => {
      if (typeof booking !== 'undefined' && booking.length > 0) {
        res.json(booking)
      }
      else {
        return res.status(400).json({msg: 'No booking found'})
      }
    })
    .catch(() => {
      res.status(HTTP_CODES.NOT_FOUND).json({booking: 'No booking found'})
    })
})

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
        res.json(booking)
      }
      else {
        return res.status(400).json({msg: 'No booking found'})
      }
    })
    .catch(err => console.error(err))

})

// @Route GET /myAlfred/api/booking/avocotes
// Returns all bookings from avocotes customer not already handled
// @Access private
router.get('/avocotes', passport.authenticate('admin', {session: false}), (req, res) => {
  Booking.find({
    company_customer: {$exists: true, $ne: null},
    status: {$nin: [BOOK_STATUS.TO_PAY, BOOK_STATUS.FINISHED, BOOK_STATUS.CANCELLED, BOOK_STATUS.EXPIRED]},
  })
    .populate('user')
    .then(customer_bookings => {
      Booking.find({
        customer_booking: {$in: customer_bookings.map(b => b._id)},
        status: {$in: [BOOK_STATUS.CONFIRMED, BOOK_STATUS.FINISHED, BOOK_STATUS.TO_CONFIRM, BOOK_STATUS.PREAPPROVED, BOOK_STATUS.TO_PAY]},
      },
      {'customer_booking': 1})
        .then(admin_bookings => {
          let pending_customer_bookings=customer_bookings.filter(b => !admin_bookings.map(a => a.customer_booking.toString()).includes(b._id.toString()))
          res.json(pending_customer_bookings)
        })
    })
})

/**
 @Route POST /myAlfred/api/bookings/compute
 Compute prices for booking
 Body:
   serviceUserId: serviceUser
   location: in ALL_LOCATIONS
   prestations: {prestation_id: count}
   cpf: true or false
   date: booking date
 @Access private
 */
router.post('/compute', passport.authenticate('jwt', {session: false}), (req, res) => {
  return ServiceUser.findById(req.body.serviceUserId)
    .populate('alfred')
    .populate('user')
    .populate({path: 'prestations', populate: 'prestation'})
    .then(serviceUser => {
      if (!serviceUser) { throw new NotFoundError(`ServiceUser introuvable`) }
      return req.context.payment.compute({...req.body, serviceUser: serviceUser})
    })
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route GET /myAlfred/booking/:id
// View one booking
// @Access public
router.get('/:id', (req, res) => {

  // Si utilisateur non connecté, on ne retourne le booking que si c'est un AvoCotés (i.e. company_customer)
  const filter=get_logged_id(req) ? {} : {company_customer: {$ne: null}}
  Booking.findOne({...filter, _id: req.params.id})
    .populate('alfred', '-id_card')
    .populate('user', '-id_card')
    .populate('prestation')
    .populate('equipments')
    .populate({path: 'customer_booking', populate: {path: 'user'}})
    .lean({virtuals: true})
    .then(booking => {
      if (booking) {
        res.json(booking)
      }
      else {
        return res.status(400).json({msg: 'No booking found'})
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500)
    })
})

router.get('/:id/ics', (req, res) => {
  let title
  Booking.findById(req.params.id)
    .populate({path: 'user', select: 'firstname'})
    .populate({path: 'alfred', select: 'firstname'})
    .then(booking => {
      title=`${booking.service} ${booking.alfred ? `par ${booking.alfred.firstname}`:''} pour ${booking.user.firstname}`
      const start=moment(booking.prestation_date)
      const end= booking.end_date ? moment(booking.end_date) : null
      return ics.createEvent({
        uid: booking._id.toString(),
        title: title,
        start: [start.year(), start.month()+1, start.date(), start.hour(), start.minute(), start.second()],
        end: end && [end.year(), end.month()+1, end.date(), end.hour(), end.minute(), end.second()],
        location: formatAddress(booking.address),
        // geo: {lat: booking.address.gps.lat, lon: booking.address.gps.lng},
        status: booking.status==BOOK_STATUS.CANCELLED ? 'CANCELLED' : booking.status==BOOK_STATUS.TO_CONFIRM ? 'TENTATIVE' : 'CONFIRMED',
        busyStatus: 'BUSY',
        url: new URL(`/reservations/reservations?id=${booking._id}`, getHostUrl()).href,
        description: `<a href="${new URL(`/reservations/reservations?id=${booking._id}`, getHostUrl()).href}">Accéder à ma réservation</a>`,
      })
    })
    .then(result => {
      if (result.error) {
        console.error(result.error)
        return res.status(400).json(result.error)
      }
      res.setHeader('Content-Type', 'text/calendar')
      res.setHeader('Content-Disposition', `attachment; filename="${title}.ics"`)
      return res.send(result.value)
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

router.get('/:id/google_calendar', (req, res) => {
  let title
  Booking.findById(req.params.id)
    .populate({path: 'user', select: 'firstname'})
    .populate({path: 'alfred', select: 'firstname'})
    .then(booking => {
      title=`${booking.service} ${booking.alfred ? `par ${booking.alfred.firstname}`:''} pour ${booking.user.firstname}`
      const start=booking.prestation_date.toISOString().replace(/[-:]/g, '').replace(/\.\d\d\dZ/, 'Z')
      const end=booking.end_date ? booking.end_date.toISOString().replace(/[-:]/g, '').replace(/\.\d\d\dZ/, 'Z') : start
      console.log(start)
      const url=googleCalendarEventUrl({
        uid: booking._id.toString(),
        title: title,
        start: start,
        end: end,
        location: formatAddress(booking.address),
        // geo: {lat: booking.address.gps.lat, lon: booking.address.gps.lng},
        status: booking.status==BOOK_STATUS.CANCELLED ? 'CANCELLED' : booking.status==BOOK_STATUS.TO_CONFIRM ? 'TENTATIVE' : 'CONFIRMED',
        busyStatus: 'BUSY',
        details: `<a href="${new URL(`/reservations/reservations?id=${booking._id}`, getHostUrl()).href}">Accéder à ma réservation</a>`,
      })
      res.redirect(url)
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

// @Route DELETE /myAlfred/booking/:id
// Delete one booking
// @Access private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Booking.findById(req.params.id)
    .then(message => {
      message.remove().then(() => res.json({success: true}))
    })
    .catch(() => {
      res.status(HTTP_CODES.NOT_FOUND).json({bookingnotfound: 'No booking found'})
    })
})

router.put('/modifyBooking/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const obj = req.body
  const canceller_id = req.user._id

  console.log(`Booking ${req.params.id}: setting booking:${JSON.stringify(obj)}`)
  Booking.findById(req.params.id)
    .populate('alfred')
    .populate('user')
    .populate('prestation')
    .populate('equipments')
    .populate({path: 'customer_booking', populate: {path: 'user'}})
    .then(booking => {
      if (!booking) {
        return res.status(HTTP_CODES.NOT_FOUND).json('No booking #${req.params.id}')
      }
      if (obj.status) {
        const machine=stateMachineFactory(booking.status)
        machine.checkAllowed(obj.status)
      }
      Object.keys(obj).forEach(key => {
        booking[key]=obj[key]
      })

      booking.save()
        .then(booking => {
          if (booking.user.company_customer && booking.status==BOOK_STATUS.CUSTOMER_PAID) {
            // Prévenir les admins d'une nouvelle résa
            User.find({is_admin: true}, 'firstname email phone')
              .then(admins => {
                const search_link = new URL('/search', getHostUrl())
                const prestations=booking.prestations.map(p => p.name).join(',')
                const msg=`Chercher les prestations '${prestations}' pour le compte ${booking.user.email} via ${search_link}`
                const subject=`Nouvelle réservation Avocotés pour ${booking.user.email}`
                admins.forEach(admin => {
                  sendAlert(admin, subject, msg)
                })
              })
              .catch(err => {
                console.error(err)
              })
          }
          else {
            if (booking.status === BOOK_STATUS.TO_CONFIRM) {
              sendBookingDetails(booking)
              sendNewBookingManual(booking, req)
            }
            if (booking.status === BOOK_STATUS.CONFIRMED) {
              sendBookingConfirmed(booking)
            }
            if (booking.status === BOOK_STATUS.REFUSED) {
              if (canceller_id === booking.user._id) {
                sendBookingRefusedToAlfred(booking, req)
              }
              else {
                sendBookingRefusedToClient(booking, req)
              }
            }
            if (booking.status === BOOK_STATUS.PREAPPROVED) {
              sendAskInfoPreapproved(booking, req)
            }
            if (booking.status === BOOK_STATUS.CANCELLED) {
              if (canceller_id === booking.user._id) {
                sendBookingCancelledByClient(booking)
              }
              else {
                sendBookingCancelledByAlfred(booking, req)
              }
            }
          }
          return res.json(booking)
        })
        .catch(err => {
          console.error(err)
          res.status(500).json(err.toString())
        })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err.toString())
    })
})

// @Route POST /myAlfred/api/booking/avocotes
// Create user, mango accounbt and booking for avocotes
// @Access public
router.post('/avocotes', (req, res) => {
  const {errors, isValid} = validateAvocotesCustomer(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Company.findOne({name: AVOCOTES_COMPANY_NAME})
    .then(company => {
      const userData={
        firstname: req.body.firstname,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        billing_address: req.body.address,
        company_customer: company,
        birthday: '01/01/1980',
        password: 'tagada',
      }
      return User.findOneAndUpdate({email: req.body.email}, userData, {upsert: true, new: true})
    })
    .then(user => {
      console.log(`Created/updated DB user:${JSON.stringify(user)}`)
      if (user.id_mangopay) {
        return Promise.resolve(user)
      }
      console.log(`Creating Mango user:${JSON.stringify(user)}`)
      return createMangoClient(user)
    })
    .then(user => {
      return user.save()
    })
    .then(user => {
      let bookData={
        user: user, address: user.billing_address,
        service: req.body.service._id, amount: req.body.totalPrice, customer_fee: 0,
        prestations: req.body.prestations, reference: computeBookingReference(user, user),
        company_customer: user.company_customer, status: BOOK_STATUS.TO_PAY,
      }
      return Booking.create(bookData)
    })
    .then(booking => {
      return res.json(booking)
    })
    .catch(err => {
      console.error(err)
      res.json(err)
    })
})

// Check bookings to set to FINISHED
Booking && new CronJob('0 */35 * * * *', (() => {
  console.log('Checking terminated bookings')
  const date = moment().startOf('day')

  Booking.find({status: BOOK_STATUS.CONFIRMED, paid: false})
    .populate('user')
    .populate('alfred')
    .then(booking => {
      booking.forEach(b => {
        console.log(JSON.stringify(b, null, 2))
        const end_date = moment(b.end_date, 'DD-MM-YYYY').add(1, 'days').startOf('day')
        if (moment(date).isSameOrAfter(end_date)) {
          console.log(`Booking #${b._id} terminated`)
          b.status = BOOK_STATUS.FINISHED
          b.save()
            .then(bo => {
              sendLeaveCommentForAlfred(bo)
              sendLeaveCommentForClient(bo)
              // Avocotes : send billing mail to provider
              if (bo.customer_booking) {
                sendBillingToAlfred(bo)
              }
            })
            .catch(err => console.error(err))
        }
      },
      )
    })
    .catch(err => console.error(err))
}), null, true, 'Europe/Paris')

// Check bookings to pay
Booking && new CronJob('0 0 * * * *', (() => {
  console.log('Checking bookings to pay')
  Booking.find({status: BOOK_STATUS.FINISHED, paid: false})
    .populate('user')
    .populate('alfred')
    .populate({path: 'customer_booking', populate: {path: 'user'}})
    .populate({path: 'provider_fees', populate: {path: 'target'}})
    .populate({path: 'customer_fees', populate: {path: 'target'}})
    .then(bookings => {
      bookings.forEach(booking => {
        console.log(`Booking ${booking._id} to pay`)
        // TODO: context non disponible => à régler
        payBooking(booking)// , context)
      })
    }).catch(err => {
      console.error(err)
    })
}), null, true, 'Europe/Paris')

// Expiration réervation en attente de confirmation :
// - soit EXPIRATION_DELAY jours après la date de création de la réservation
// - soit après la date de prestation
Booking && new CronJob('0 */15 * * * *', (() => {
  console.log('Checking expired bookings')
  const currentDate = moment().startOf('day')
  Booking.find({$or: [{status: BOOK_STATUS.TO_CONFIRM}, {status: BOOK_STATUS.TO_PAY}]})
    .populate('user')
    .populate('alfred')
    .then(booking => {
      booking.forEach(b => {
        const expirationDate = moment(b.date).add(EXPIRATION_DELAY, 'days').startOf('day')
        // Expired because Alfred did not answer
        const answerExpired = moment(currentDate).isSameOrAfter(expirationDate)
        // Expired because prestation date passed
        const prestaDateExpired = moment().isSameOrAfter(b.prestation_date)
        if (answerExpired || prestaDateExpired) {
          const reason = answerExpired ? `Alfred did not confirm within ${EXPIRATION_DELAY} days` : 'prestation date passed'
          console.log(`Booking ${b._id} expired : ${reason}`)
          b.status = BOOK_STATUS.EXPIRED
          b.save()
            .then(bo => {
              sendBookingExpiredToAlfred(bo)
              sendBookingExpiredToClient(bo)
            })
            .catch(err => {
              console.error(err)
            })
        }
      })
    })
}), null, true, 'Europe/Paris')

// pattern reference
// premiere lettre nom user +  premiere lettre prenom user + premiere lettre nom alfred +  premiere lettre prenom alfred + date + 5 random
// LJBG_2242019_a5fr1


module.exports = router
