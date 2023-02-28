const moment = require('moment')
const lodash = require('lodash')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const {
  CURRENT,
  FINISHED,
  MAX_BOOKING_GUESTS,
  PAID_STR,
  PAYMENT_SUCCESS,
  PLACES,
  TO_COME,
  TO_PAY_STR,
} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const BookingSchema = new Schema(
  {
    table_number: {
      type: String,
      required: false,
    },
    start_date: {
      type: Date,
      required: [true, "La date/heure de réservation est obligatoire"],
      min: [moment(), "Date antérieure à la date d'aujourd'hui"],
    },
    duration: {
      type: Number,
      min: 1,
      max: 24,
      required: [true, "La durée de réservation est obligatoire"],
    },
    booking_user: {
      // User who booked
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    guests: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'guest',
      }],
      default: [],
      validate: [value => value.length <= MAX_BOOKING_GUESTS, 'Vous ne pouvez inviter plus de ${MAX_BOOKING_GUESTS} personnes'],
      required: true,
    },
    guests_count: {
      type: Number,
      min: 0,
      max: [MAX_BOOKING_GUESTS, `Vous ne pouvez inviter plus de ${MAX_BOOKING_GUESTS} personnes`],
      default: 0,
      required: [true, "Le nombre d'invités est obligatoire"],
    },
    comments: {
      type: String,
    },
    place: {
      type: String,
      enum: [...Object.keys(PLACES)],
      required: false, // required: true,
    },
    // Order items
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'orderItem',
      },
    ],
    // Booking order #
    booking_number: {
      type: Number,
      required: true,
    }
  },
  schemaOptions,
)

// Ensure autoincrement is initalized
if (mongoose.connection) {
  autoIncrement.initialize(mongoose.connection)
}

BookingSchema.plugin(autoIncrement.plugin, { model: 'booking', field: 'booking_number' });

// This booking's payments
BookingSchema.virtual('payments', {
  ref: 'payment', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'booking', // is equal to foreignField
})

BookingSchema.pre('validate', function(next) {
  if (this.guests_count < this.guests.length) {
    this.invalidate('guests_count', `Vous avez déjà envoyé ${this.guests.length} invitations`, this.guests_count)
  }
  next()
})

BookingSchema.virtual('people_count').get(function() {
  return (this.guests_count || 0)+1
})

BookingSchema.virtual('end_date').get(function() {
  return this.start_date && this.duration ?
    moment(this.start_date).add(this.duration, 'hours')
    :
    null
})

BookingSchema.virtual('status').get(function() {
  if (this.start_date && moment() < moment(this.start_date)) {
    return TO_COME
  }
  if (this.end_date && moment() > moment(this.end_date)) {
    return FINISHED
  }
  // Not before, not after => current if both dates defined
  if (this.start_date && this.end_date) {
    return CURRENT
  }
  return null
})

BookingSchema.virtual('total_price').get(function() {
  return lodash(this.items).map('total_price').sum()
})

BookingSchema.virtual('total_vat_amount').get(function() {
  return lodash(this.items).map('total_vat_amount').sum()
})

BookingSchema.virtual('total_net_price').get(function() {
  return lodash(this.items).map('total_net_price').sum()
})

BookingSchema.virtual('remaining_total').get(function() {
  const already_paid=lodash(this.payments).filter(p => p.status==PAYMENT_SUCCESS).map('amount').sum()
  const total=lodash(this.items).map('total_price').sum()
  return total-already_paid
})

BookingSchema.virtual('remaining_vat_amount').get(function() {
  const total=this.total_price
  const vat_total=this.total_vat_amount
  const remaining_total=this.remaining_total
  return remaining_total*vat_total/total
})

BookingSchema.virtual('paid').get(function() {
  if (lodash.isEmpty(this.items)) {
    return false
  }
  const already_paid=lodash(this.payments).filter(p => p.status==PAYMENT_SUCCESS).map('amount').sum()
  const total=lodash(this.items).map('total_price').sum()
  return already_paid==total
})

BookingSchema.virtual('paid_str').get(function() {
  if (lodash.isEmpty(this.items)) {
    return ''
  }
  const already_paid=lodash(this.payments).filter(p => p.status==PAYMENT_SUCCESS).map('amount').sum()
  const total=lodash(this.items).map('total_price').sum()
  const res=already_paid==total ? PAID_STR : TO_PAY_STR
  return res
})

module.exports = BookingSchema
