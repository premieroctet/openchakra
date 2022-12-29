const moment = require('moment')
const mongoose = require('mongoose')
const {
  CURRENT,
  FINISHED,
  PLACES,
  TO_COME,
} = require('../../../utils/fumoir/consts')
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
      required: false, // required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    guests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'guest',
      },
    ],
    people_count: {
      type: Number,
      min: 1,
      max: 15,
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
