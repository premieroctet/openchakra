const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {GENDER} = require('../../../utils/dekuple/consts')
const {schemaOptions} = require('../../utils/schemas')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    set: v => v.toLowerCase().trim(),
  },
  password: {
    type: String,
    required: true,
    default: 'invalid',
    set: pass => bcrypt.hashSync(pass, 10),
  },
  withings_id: {
    type: String,
    required: true,
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
    required: true,
  },
  gender: {
    type: String,
    enum: Object.keys(GENDER),
    default: null,
    required: false,
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
