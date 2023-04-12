const mongoose = require('mongoose')
const {ACTIVITY, HOME_STATUS, ROLES, ROLE_CUSTOMER, STATUS_FAMILY} = require('../consts')
const {GENDER} = require('../../dekuple/consts')
const {schemaOptions} = require('../../../utils/schemas')
const lodash=require('lodash')

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
    set: v => v.toLowerCase().trim(),
  },
  birthday: {
    type: Date,
    required: [function() { return this.role==ROLE_CUSTOMER }, 'La date de naissance est obligatoire'],
  },
  pseudo: {
    type: String,
    set: v => v?.trim(),
    required: [function() { return this.role==ROLE_CUSTOMER }, 'Le pseudo est obligatoire'],
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: false,
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    default: 'invalid',
  },
  role: {
    type: String,
    enum: Object.keys(ROLES),
    default: ROLE_CUSTOMER,
    required: [true, 'Le rôle est obligatoire'],
  },
  cguAccepted: {
    type: Boolean,
    validate: {
      validator: function(v) { return this.role!=ROLE_CUSTOMER || !!v },
      message: 'Vous devez accepter les CGU',
    },
    required: [function() { return this.role==ROLE_CUSTOMER }, 'Vous devez accepter les CGU'],
  },
  dataTreatmentAccepted: {
    type: Boolean,
    validate: {
      validator: function(v) { return this.role!=ROLE_CUSTOMER || !!v },
      message: 'Vous devez accepter le traitement des données',
    },
    required: [function() { return this.role==ROLE_CUSTOMER }, 'Vous devez accepter le traitement des données'],
  },
  child_count: {
    type: Number,
    default: 0,
    required: false,
  },
  gender: {
    type: String,
    enum: Object.keys(GENDER),
    required: [function() { return this.role==ROLE_CUSTOMER }, 'Le genre est obligatoire'],
  },
  activity: {
    type: String,
    enum: Object.keys(ACTIVITY),
    required: [function() { return this.role==ROLE_CUSTOMER }, "L'activité est obligatoire"],
  },
  targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
  }],
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
// Required for register validation only
UserSchema.virtual('password2').get(function() {
})

UserSchema.virtual('fullname').get(function() {
  return `${this.firstname || ''} ${this.lastname || ''}`
})

UserSchema.virtual('spoons_count').get(function() {
  return lodash(this.spoons)
    .map(s => s.count)
    .sum()
})

// Computed virtual
UserSchema.virtual('available_contents').get(function() {})

UserSchema.virtual("spoons", {
  ref: "spoon", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

/* eslint-enable prefer-arrow-callback */


module.exports = UserSchema
