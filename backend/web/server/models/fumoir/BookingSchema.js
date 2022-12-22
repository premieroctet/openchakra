const moment = require('moment')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')
const {PLACES} = require('../../../utils/fumoir/consts')

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
  },
  schemaOptions,
)

BookingSchema.virtual('end_date').get(function() {
  return this.start_date && this.duration ?
    moment(this.start_date).add(this.duration, 'hours')
    :
    null
})

BookingSchema.virtual('orders', {
  ref: 'order', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'booking', // is equal to foreignField
})


module.exports = BookingSchema
