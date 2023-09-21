const mongoose = require('mongoose')
const moment=require('moment')
const {schemaOptions} = require('../../../utils/schemas')
const {idEqual}=require('../../../utils/database')
const {
  APPOINTMENT_CURRENT,
  APPOINTMENT_PAST,
  APPOINTMENT_TO_COME
} = require('../consts')

const Schema = mongoose.Schema

const AppointmentTypeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
  },
  // In minutes
  duration: {
    type: Number,
    required: [true, 'La durée est obligatoire'],
  },
  smartagenda_id: {
    type: Number,
    required: [true, `L'identifiant Smartagenda est obligatoire`],
  }
}, schemaOptions)

module.exports = AppointmentTypeSchema
