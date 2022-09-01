const moment = require('moment')
const {BOOK_STATUS, TRANSACTION_SUCCEEDED, LOCATION_CLIENT, LOCATION_ALFRED}=require('../../utils/consts')
const MarketplacePayment=require('../plugins/payment/marketplacePayment')
const PlatformPayment=require('../plugins/payment/platformPayment')
const {computeDistanceKm}=require('../../utils/functions')
const ServiceUser=require('../models/ServiceUser')
require('../models/Service')
const {computeBookingReference}=require('../../utils/text')
const Booking=require('../models/Booking')
const {upsertChatroom}=require('./chatroom')
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
  if (location!=LOCATION_CLIENT) {
    return null
  }
  // Check distance
  const addr=serviceUser.customer_booking?.address || customer.billing_address
  const distance=computeDistanceKm(addr.gps, serviceUser.user.billing_address.gps)
  return distance
}

const createBooking = ({customer, serviceUserId, prestations, date, cpf, location, customerBookingId, informationRequest}) => {
  let modifiedDate=cpf ? moment(date).set({hour: 0, minute: 0, second: 0, millisecond: 0}) : date
  let bookData={location, user: customer._id, serviceUserId: serviceUserId, prestation_date: modifiedDate, cpf_booked: cpf, customer_booking: customerBookingId}
  let serviceUser=null
  return ServiceUser.findById(serviceUserId)
    .populate('user')
    .populate('service')
    .populate({path: 'prestations', populate: 'prestation'})
    .populate('customer_booking')
    .then(result => {
      if (!result) {
        throw new NotFoundError(`ServiceUser ${serviceUserId} introuvable`)
      }
      serviceUser=result
      const prestas=Object.entries(prestations).map(([key, count]) => {
        const prestation=serviceUser.prestations.find(p => p._id.toString()==key)
        return {name: prestation.prestation.label, price: prestation.price, value: count}
      })
      const address=location==LOCATION_CLIENT ? customer.billing_address
        : location==LOCATION_ALFRED ? serviceUser.user.billing_address
          :null
      bookData={...bookData,
        alfred: serviceUser.user,
        service: serviceUser.service.label,
        reference: computeBookingReference(customer, serviceUser.user),
        equipments: serviceUser.equipments,
        prestations: prestas,
        cpf_link: cpf && serviceUser.cpf_link || null,
        elearning_link: serviceUser.elearning_link,
        address: address,
      }
      const distance=computeServiceDistance({location, serviceUser, customer})
      const payment=serviceUser.customer_booking ? new PlatformPayment() : new MarketplacePayment()
      return payment.compute({serviceUser, prestations, location, cpf, distance})
    })
    .then(prices => {
      const status=
      informationRequest ? BOOK_STATUS.INFO:
        customerBookingId ? BOOK_STATUS.TO_CONFIRM
          : informationRequest ? BOOK_STATUS.INFO
            : cpf ? BOOK_STATUS.TO_CONFIRM
              : BOOK_STATUS.TO_PAY
      bookData={...bookData, ...prices, amount: prices.total, status: status}
      return Booking.create(bookData)
    })
    .then(book => {
      return upsertChatroom(customer._id, serviceUser.user._id, book)
        .then(() => book)
    })
    .then(book => {
      return Booking.findById(book._id)
    })
}

module.exports = {
  checkPaid, createBooking,
}
