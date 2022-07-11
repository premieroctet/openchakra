const moment = require('moment')
const MarketplacePayment=require('../plugins/payment/marketplacePayment')
const PlatformPayment=require('../plugins/payment/platformPayment')
const {computeDistanceKm}=require('../../utils/functions')
const ServiceUser=require('../models/ServiceUser')
require('../models/Service')
const {computeBookingReference}=require('../../utils/text')
const Booking=require('../models/Booking')
const {TRANSACTION_SUCCEEDED} = require('../../utils/consts')
const {NotFoundError}=require('./errors')

moment.locale('fr')

// Check wether mango
const checkPaid = booking => {
  if (booking.mangopay_payout_status==TRANSACTION_SUCCEEDED
      && [...booking.customer_fees, ...booking.provider_fees].every(f => f.payout_status==TRANSACTION_SUCCEEDED)) {
    console.log(`Booking ${booking._id} has been paid`)
    booking.paid=true
  }
}

const computeServiceDistance = ({location, serviceUser, customer}) => {
  if (location!='main') {
    return null
  }
  // Check distance
  const addr=serviceUser.customer_booking?.address || customer.billing_address
  const distance=computeDistanceKm(addr.gps, serviceUser.user.billing_address.gps)
  return distance
}

const createBooking = ({customer, serviceUserId, prestations, date, cpf, location, customerBooking}) => {
  let bookData={prestation_date: date, cpf_booked: cpf, customer_booking: customerBooking}
  return ServiceUser.findById(serviceUserId)
    .populate('user')
    .populate('service')
    .populate({path: 'prestations', populate: 'prestation'})
    .populate('customer_booking')
    .then(serviceUser => {
      if (!serviceUser) {
        throw new NotFoundError(`ServiceUser ${serviceUserId} introuvable`)
      }
      const prestas=Object.entries(prestations).map(([key, count]) => {
        const prestation=serviceUser.prestations.find(p => p._id.toString()==key)
        return {name: prestation.prestation.label, price: prestation.price, value: count}
      })
      bookData={...bookData, service: serviceUser.service.label,
        reference: computeBookingReference(customer, serviceUser.user),
        equipments: serviceUser.equipments,
        prestations: prestas, cpf_link: serviceUser.cpf_link}
      const distance=computeServiceDistance({location, serviceUser, customer})
      const payment=serviceUser.customer_booking ? new PlatformPayment() : new MarketplacePayment()
      return payment.compute({serviceUser, prestations, location, cpf_booked: cpf, distance})
    })
    .then(prices => {
      bookData={...bookData, ...prices, amount: prices.total}
      return Booking.create(bookData)
    })
    .then(book => {
      return Booking.findById(book._id)
    })
    .then(book => {
      return book
    })
}

module.exports = {
  checkPaid, createBooking,
}
