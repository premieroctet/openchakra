const moment = require('moment')
const ServiceUser=require('../models/ServiceUser')
require('../models/Service')
const {computeBookingReference}=require('../../utils/text')
const Booking=require('../models/Booking')
const {TRANSACTION_SUCCEEDED} = require('../../utils/consts')

moment.locale('fr')

const getNextNumber = value => {
  if (value == undefined || null) {
    return value = 1
  }
  return value += 1

}

const getKeyDate = () => {
  return moment().format('YMM')
}

// Check wether mango
const checkPaid = booking => {
  if (booking.mangopay_payout_status==TRANSACTION_SUCCEEDED
      && [...booking.customer_fees, ...booking.provider_fees].every(f => f.payout_status==TRANSACTION_SUCCEEDED)) {
    console.log(`Booking ${booking._id} has been paid`)
    booking.paid=true
  }
}

const computeServiceDistance = ({location, serviceUserId, userId}) => {
  if (location!='main') {
    return null
  }
  // Check distance
  const addr=customerBooking ?
    Booking.findById(customerBookingId, 'address').then(booking => booking.address)
    :
    User.findById(userId, 'billing_address').then(user => user.billing_address)
  Promise.all([serviceUser.user.billing_address, addr])
    .then(res => {
      if (res!=null) {
        const [custAddress, alfAddress]=res
        return computeDistanceKm(custAddress.gps, alfAddress.gps)
      }
    })
}

const createBooking = ({customer, serviceUserId, prestations, date, cpf, location, payment, customerBooking}) => {
  let bookData={prestation_date: date, cpf_booked: cpf, customer_booking: customerBooking}
  return ServiceUser.findById(serviceUserId)
    .populate('user')
    .populate('service')
    .populate({path: 'prestations', populate: 'prestation'})
    .then(su => {
      if (!su) {
        throw new NotFoundError(`ServiceUser ${serviceUserId} introuvable`)
      }
      const prestas=Object.entries(prestations).map(([key, count]) => {
        const prestation=su.prestations.find(p => p._id.toString()==key)
        return {name: prestation.prestation.label, price: prestation.price, value: count}
      })
      bookData={...bookData, service: su.service.label,
        reference: computeBookingReference(customer, su.user), equipments: su.equipments,
        prestations: prestas}
      return payment.compute({serviceUser: serviceUserId, prestations, location, cpf_booked: cpf})
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
  getNextNumber, getKeyDate, checkPaid, createBooking,
}
