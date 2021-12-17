const {TRANSACTION_SUCCEEDED} = require('../../utils/consts')
const moment = require('moment')

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

module.exports = {
  getNextNumber, getKeyDate, checkPaid,
}
