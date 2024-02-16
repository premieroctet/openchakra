const mongoose = require('mongoose')
const moment=require('moment')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')
const { DUMMY_REF } = require('../../../utils/database')

const Schema = mongoose.Schema

const RangeSchema = new Schema({
  // Diet
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  start_date: {
    type: Date,
    required: [true, 'La date de début est obligatoire']
  },
  appointment_type: {
    type: Schema.Types.ObjectId,
    ref: 'appointmentType',
    required: [true, `Le type de rendez-vous est obligatoire`],
  },
}, schemaOptions)

RangeSchema.virtual('day', DUMMY_REF).get(function() {
  return this.start_date
})

RangeSchema.virtual('range_str', DUMMY_REF).get(function() {
  const start=moment(this.start_date)
  const end=moment(this.end_date)
  return `${start.format('HH:mm')}->${end.format('HH:mm')}`
})

RangeSchema.virtual('end_date', DUMMY_REF).get(function() {
  const end=moment(this.start_date).add(this.duration, 'minutes')
  return end
})

RangeSchema.virtual('duration', DUMMY_REF).get(function() {
  return this?.appointment_type.duration
})

module.exports = RangeSchema
