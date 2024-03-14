const mongoose = require('mongoose')
const moment=require('moment')
const {schemaOptions} = require('../../../utils/schemas')
const {idEqual, DUMMY_REF}=require('../../../utils/database')
const {
  APPOINTMENT_CURRENT,
  APPOINTMENT_PAST,
  APPOINTMENT_TO_COME,
  APPOINTMENT_STATUS,
  APPOINTMENT_VALIDATION_PENDING,
  APPOINTMENT_VALID,
  APPOINTMENT_RABBIT
} = require('../consts')
const lodash=require('lodash')

const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
  coaching: {
    type: Schema.Types.ObjectId,
    ref: 'coaching',
    index: true,
    required: [true, 'Le coaching est obligatoire'],
  },
  diet: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    required: [true, 'La diet est obligatoire'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    required: [true, 'Le patient est obligatoire'],
  },
  start_date: {
    type: Date,
    index: true,
    required: [true, 'La date de début est obligatoire'],
  },
  end_date: {
    type: Date,
    index: true,
    validate: [function(v) { return !this || moment(v).isAfter(this.start_date)}, 'La fin doit être postérieure au début'],
    required: [true, 'La date de fin est obligatoire'],
  },
  appointment_type: {
    type: Schema.Types.ObjectId,
    index: true,
    ref: 'appointmentType',
    required: [true, 'La prestation est obligatoire'],
  },
  smartagenda_id: {
    type: String,
  },
  visio_url: {
    type: String,
  },
  synthesis: {
    type: String,
    required: false,
  },
  note: {
    type: String,
    required: false,
  },
  // For each new appointment, copy the ones from the previous
  objectives: [{
    type: Schema.Types.ObjectId,
    index: true,
    ref: 'quizzQuestion',
    required: true,
  }],
  user_objectives: [{
    type: Schema.Types.ObjectId,
    ref: 'userQuizzQuestion',
    required: true,
  }],
  logbooks: [{
    type: Schema.Types.ObjectId,
    ref: 'quizz',
    required: true,
  }],
  migration_id: {
    type: Number,
    index: true,
    required: false,
  },
  validated: {
    type: Boolean,
    index: true,
    required: false,
  },
  }, schemaOptions)

AppointmentSchema.virtual('order', DUMMY_REF).get(function() {
  return lodash.sortBy(this.coaching?.appointments||[], 'start_date')
   .findIndex(app => idEqual(app._id, this._id))+1
   })

AppointmentSchema.virtual('status', DUMMY_REF).get(function() {
  const now=moment()
  if (now.isBefore(this.start_date)) {
    return APPOINTMENT_TO_COME
  }
  if (now.isBetween(this.start_date, this.end_date)) {
    return APPOINTMENT_CURRENT
  }
  // Past appt
  if (lodash.isNil(this.validated) ) {
    return APPOINTMENT_VALIDATION_PENDING 
  }
  return this.validated ? APPOINTMENT_VALID : APPOINTMENT_RABBIT
})
module.exports = AppointmentSchema
