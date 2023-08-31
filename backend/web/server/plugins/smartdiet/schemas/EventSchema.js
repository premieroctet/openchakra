const {
  APPOINTMENT_CURRENT,
  APPOINTMENT_PAST,
  APPOINTMENT_TO_COME,
  EVENT_COLL_CHALLENGE,
  EVENT_TYPE,
  HOME_STATUS
} = require('../consts')
const moment = require('moment')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Le créateur est obligatoire'],
  },
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire'],
  },
  start_date: {
    type: Date,
    required: [true, 'La date de début est obligatoire'],
  },
  end_date: {
    type: Date,
    required: [true, 'La date de fin est obligatoire'],
  },
  picture: {
    type: String,
    required: false,
  },
  key: {
    type: Schema.Types.ObjectId,
    ref: 'key',
  },
  dummy: {
    type: Number,
    default: 0,
    required: true,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
EventSchema.virtual('type').get(function () {
  return null
})

EventSchema.virtual('duration').get(function () {
  return moment(this.end_date).diff(this.start_date, 'minutes')
})

EventSchema.virtual('status').get(function () {
  const now=moment()
  return now.isAfter(this.end_date) ? APPOINTMENT_PAST:
  now.isBefore(this.start_date) ? APPOINTMENT_TO_COME:
  APPOINTMENT_CURRENT
})

/* eslint-enable prefer-arrow-callback */


module.exports = EventSchema
