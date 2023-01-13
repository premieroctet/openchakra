const {
  CURRENT,
  FINISHED,
  MAX_BOOKING_GUESTS,
  PAID_STR,
  PLACES,
  TO_COME,
  TO_PAY_STR,
} = require('../../../utils/fumoir/consts');
const moment = require('moment')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')

const Schema = mongoose.Schema

const BookingSchema = new Schema(
  {
    table_number: {
      type: String,
      required: false, // required: true,
    },
    start_date: {
      type: Date,
      required: false, // required: true,
      min: () => moment(),
    },
    duration: {
      type: Number,
      min: 1,
      max: 24,
      required: false, // required: true,
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
      required: true,
    },
    comments: {
      type: String,
    },
    place: {
      type: String,
      enum: [...Object.keys(PLACES)],
      required: false, // required: true,
    },
    orders: [{
      type: Schema.Types.ObjectId,
      ref: 'order',
    }],
  },
  schemaOptions,
)

BookingSchema.pre('validate', function (next) {
  if (this.guests_count < this.guests.length) {
    this.invalidate('guests_count', `Vous avez déjà envoyé ${this.guests.length} invitations`, this.guests_count)
  }

  next();
});

BookingSchema.virtual('people_count').get(function() {
  return (this.guests_count || 0)+1
})

BookingSchema.virtual('end_date').get(function() {
  return this.start_date && this.duration ?
    moment(this.start_date).add(this.duration, 'hours')
    :
    null
})

BookingSchema.virtual('paid').get(function() {
  if (!this.orders || this.orders.length==0) {
    return false
  }
  return this.orders.every(i => i.paid==true)
})

BookingSchema.virtual('paid_str').get(function() {
  if (!this.orders || this.orders.length==0) {
    return TO_PAY_STR
  }
  return this.orders.every(i => i.paid==true) ? PAID_STR : TO_PAY_STR
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


module.exports = BookingSchema
