const mongoose = require('mongoose')
const moment = require('moment')
const {schemaOptions} = require('../../utils/schemas')
const {PLACES, TO_COME, CURRENT, FINISHED} = require('../../../utils/fumoir/consts')

const Schema = mongoose.Schema

const EventSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    picture: {
      type: String,
    },
    start_date: {
      type: Date,
      required: false,
    },
    end_date: {
      type: Date,
      required: false,
    },
    booking_user: {
      // User who booked
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: false,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],
    guests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'guest',
        required: true,
      },
    ],
    place: {
      type: String,
      enum: [...Object.keys(PLACES)],
      required: false,
    },
    guests_count: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions,
)

EventSchema.virtual('members_count').get(function() {
  return this.guests_count + this.members?.length || 0
})

EventSchema.virtual('status').get(function() {
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

module.exports = EventSchema
