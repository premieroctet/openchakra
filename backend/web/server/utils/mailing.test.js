const {sendBillingToAlfred}=require('./mailing')

const mongoose = require('mongoose')

const BookingSchema=require('../models/Booking')
const UserSchema=require('../models/User')

const MONGOOSE_OPTIONS={
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  useCreateIndex: true,
  useFindAndModify: false,
}

let Booking=null

describe('Mailing tests', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test-myAlfred', MONGOOSE_OPTIONS)
      .then(conn => {
        User=conn.model('User', UserSchema)
        Booking=conn.model('booking', BookingSchema)
      })
  })

  afterAll(() => {
    return mongoose.disconnect()
  })

  test('Send Alfred billing CC', () => {
    return Booking.find()
      .populate('alfred')
      .populate('user')
      .then(bookings => {
        const alfBooking=bookings[0]
        alfBooking.alfred.email='sebastien.auvray@alfredplace.io'
        alfBooking.user.email='sebastien.auvray@alfredplace.io'
        return sendBillingToAlfred(alfBooking)
      })
  })

})
