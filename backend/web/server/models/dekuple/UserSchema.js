const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {GENDER} = require('../../../utils/dekuple/consts')
const {schemaOptions} = require('../../utils/schemas')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Le prénom est obligatoire'],
  },
  lastname: {
    type: String,
    required: [true, 'Le nom de famille est obligatoire'],
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    set: v => v.toLowerCase().trim(),
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    default: 'invalid',
    set: pass => bcrypt.hashSync(pass, 10),
  },
  withings_id: {
    type: String,
    required: false, // true,
  },
  picture: {
    type: String,
    required: false,
  },
  weight: { // kg
    type: Number,
    required: false,
  },
  height: { // cm
    type: Number,
    required: false,
  },
  birthday: {
    type: Date,
    required: false, // true,
  },
  gender: {
    type: String,
    enum: Object.keys(GENDER),
    default: null,
    required: [true, `Le genre est obligatoire (${Object.values(GENDER)})`],
  },
  phone: {
    type: String,
    required: false,
  },
  smoker: {
    type: Boolean,
    required: false,
  },
  highBloodPressureTreatment: {
    type: Boolean,
    required: false,
  },
  tensiometer_withings_id: {
    type: String,
    required: false,
  },
  tensiometer_mark: {
    type: String,
    required: false,
  },
  tensiometer_serial_number: {
    type: String,
    required: false,
  },
}, schemaOptions)

UserSchema.virtual('fullname').get(function() {
  return `${this.firstname || ''} ${this.lastname || ''}`
})

UserSchema.virtual('measures', {
  ref: 'measure', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'user', // is equal to foreignField
})

UserSchema.virtual('appointments', {
  ref: 'appointment', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'user', // is equal to foreignField
})

UserSchema.virtual('reminders', {
  ref: 'reminder', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'user', // is equal to foreignField
})

module.exports = UserSchema
