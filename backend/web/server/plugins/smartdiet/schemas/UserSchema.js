const Menu = require('../../../models/Menu')
const IndividualChallenge = require('../../../models/IndividualChallenge')
const mongoose = require('mongoose')
const moment=require('moment')
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
    //required: [function() { return this.role==ROLE_CUSTOMER }, 'La date de naissance est obligatoire'],
    required: false,
  },
  pseudo: {
    type: String,
    set: v => v?.trim(),
    required: [function() { return this.role==ROLE_CUSTOMER }, 'Le pseudo est obligatoire'],
  },
  picture: {
    type: String,
    required: false,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true,
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
    //required: [function() { return this.role==ROLE_CUSTOMER }, 'Le genre est obligatoire'],
    required: false,
  },
  targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
  }],
  skipped_events: [{
    type: Schema.Types.ObjectId,
    ref: 'event',
  }],
  passed_events: [{
    type: Schema.Types.ObjectId,
    ref: 'event',
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
UserSchema.virtual('available_contents', {
  ref: "content", // The Model to use
  localField: "targets", // Find in Model, where localField
  foreignField: "targets", // is equal to foreignField
  //match: {default: true}
})

UserSchema.virtual("spoons", {
  ref: "spoon", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

UserSchema.virtual("groups", {
  ref: "group", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "users" // is equal to foreignField
});

// User's webinars are the company's ones
UserSchema.virtual('webinars').get(function() {
  const exclude=[
    ...(this.skipped_events?.map(s => s._id)||[]),
    ...(this.passed_events?.map(s => s._id)||[]),
  ]
  return this.company?.webinars?.filter(w => !exclude.some(excl => idEqual(excl._id, w._id))) || []
})

// User's ind. challenges are all exepct the skipped ones and the passed ones
UserSchema.virtual('individual_challenges').get(function() {
  return IndividualChallenge.find()
    .then(challenges => {
      const exclude=[
        ...(this.skipped_events?.map(s => s._id)||[]),
        ...(this.passed_events?.map(s => s._id)||[]),
      ]
      return challenges.filter(c => !exclude.some(excl => idEqual(excl._id, c._id)))
    })
})

// First available menu for this week
UserSchema.virtual('menu').get(function() {
  return Menu.find()
    .then(menus => {
      return menus.find(m => moment().isBetween(m.start_date, m.end_date))
    })
})

// User's clletive challenges are the company's ones
UserSchema.virtual('collective_challenges').get(function() {
  return this.company?.collective_challenges || []
})

/* eslint-enable prefer-arrow-callback */


module.exports = UserSchema
