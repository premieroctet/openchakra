const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {GENDER, SMOKER_TYPE} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstname: {
    type: String,
    set: v => v?.trim(),
    required: [true, 'Le prénom est obligatoire'],
  },
  lastname: {
    type: String,
    set: v => v?.trim(),
    required: [true, 'Le nom de famille est obligatoire'],
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    set: v => v?.toLowerCase().trim(),
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    default: 'invalid',
    set: pass => bcrypt.hashSync(pass, 10),
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  weight: { // kg
    type: Number,
    min: [1, 'Le poids doit être > 1 kg'],
    max: [600, 'Le poids doit être < 600 kg'],
    required: false,
  },
  height: { // cm
    type: Number,
    min: [10, 'La taille doit être >  10 cm'],
    max: [300, 'La taille doit être <  300 cm'],
    required: false,
  },
  birthday: {
    type: Date,
    required: [true, 'La date de naissance est obligatoire'],
  },
  gender: {
    type: String,
    enum: Object.keys(GENDER),
    default: null,
    required: [true, `La civilité est obligatoire (${Object.values(GENDER)})`],
  },
  cguAccepted: {
    type: Boolean,
    validate: [value => !!value, 'Vous devez accepter les CGU'],
    required: [true, 'Vous devez accepter les CGU'],
  },
  dataTreatmentAccepted: {
    type: Boolean,
    validate: [value => !!value, 'Vous devez accepter le traitement des données'],
    required: [true, 'Vous devez accepter le traitement des données'],
  },
  phone: {
    type: String,
    required: false,
  },
  smoker: {
    type: String,
    enum: Object.keys(SMOKER_TYPE),
    required: false,
  },
  highBloodPressureTreatment: {
    type: Boolean,
    required: false,
  },
  // At user creation, usercode allows to get a token.
  // Lasy access token, retrieved only on demand
  withings_usercode: {
    type: String,
    required: false,
  },
  withings_id: {
    type: String,
    required: false,
  },
  access_token: {
    type: String,
    required: false, // true,
  },
  expires_at: {
    type: Date,
  },
  refresh_token: {
    type: String,
    required: false, // true,
  },
  csrf_token: {
    type: String,
    required: false, // true,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
// Required for register validation only
UserSchema.virtual('password2').get(function() {
})

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

UserSchema.virtual('devices', {
  ref: 'device', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'user', // is equal to foreignField
})

/* eslint-enable prefer-arrow-callback */


module.exports = UserSchema
