const mongoose = require('mongoose')
const moment=require('moment')
const {schemaOptions} = require('../../../utils/schemas')
const {idEqual}=require('../../../utils/database')
const {
  APPOINTMENT_CURRENT,
  APPOINTMENT_PAST,
  APPOINTMENT_TO_COME
} = require('../consts')
const lodash=require('lodash')

const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
  coaching: {
    type: Schema.Types.ObjectId,
    ref: 'coaching',
    required: [true, 'Le coaching est obligatoire'],
  },
  start_date: {
    type: Date,
    required: [true, 'La date de début est obligatoire'],
  },
  end_date: {
    type: Date,
    validate: [function(v) { return moment(v).isAfter(this.start_date)}, 'La fin doit être postérieure au début'],
    required: [true, 'La date de fin est obligatoire'],
  },
  appointment_type: {
    type: Schema.Types.ObjectId,
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
    required: false,
  },
  }, schemaOptions)

AppointmentSchema.virtual('order').get(function() {
  return lodash.sortBy(this.coaching?.appointments||[], 'start_date')
   .findIndex(app => idEqual(app._id, this._id))+1
})

AppointmentSchema.virtual('status').get(function() {
  const now=moment()
  const start=moment(this.start_date)
  const end=moment(this.end_date)
  return start.isAfter(now) ?
    APPOINTMENT_TO_COME
    : end.isBefore(now) ?
    APPOINTMENT_PAST:
    APPOINTMENT_CURRENT

})
module.exports = AppointmentSchema
