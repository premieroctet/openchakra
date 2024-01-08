const lodash=require('lodash')
const { isEmailOk } = require('../../../../utils/sms')
const { isPhoneOk } = require('../../../../utils/sms')
const mongoose = require('mongoose')
const { schemaOptions } = require('../../../utils/schemas')
const { CALL_STATUS, CALL_DIRECTION, COACHING_CONVERSION_STATUS } = require('../consts')

const Schema = mongoose.Schema

const LeadSchema = new Schema({
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
    validate: [isEmailOk, v => `L'email '${v?.value}' est invalide`],
    required: [true, 'L\'email est obligatoire'],
    set: v => v?.toLowerCase().trim(),
  },
  // Custom identifier
  identifier: {
    type: String,
    set: v => v ? v.trim() : v,
    required: false,
  },
  company_code: {
    type: String,
    set: v => v ? v.replace(/ /g,'') : v,
    required: false,
    index: true,
  },
  source: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    validate: [value => !value || isPhoneOk(value), v => `Le numéro de téléphone '${v?.value}'' doit commencer par 0 ou +33`],
    set: v => v?.replace(/^0/, '+33'),
    required: false,
  },
  // Calls attributes
  comment: {
    type: String,
    required: false,
  },
  call_status: {
    type: String,
    enum: Object.keys(CALL_STATUS),
    required: false,
  },
  campain: {
    type: String,
    required: false,
  },
  operator: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "job",
    required: false,
  },
  decline_reason: {
    type: Schema.Types.ObjectId,
    ref: "declineReason",
    required: false,
  },
  join_reason: {
    type: Schema.Types.ObjectId,
    ref: "joinReason",
    required: false,
  },
  next_call_date: {
    type: Date,
    required: false,
  },
  interested_in: [{
    type: Schema.Types.ObjectId,
    ref: "interest",
    required: false,
  }],
  call_direction: {
    type: String,
    enum: Object.keys(CALL_DIRECTION)
  },
  consent: {
    type: Boolean,
    required: false,
  },
  nutrition_converted: {
    type: Boolean,
    default: false,
    required: false,
  },
  coaching_converted: {
    type: String,
    enum: Object.keys(COACHING_CONVERSION_STATUS)
  },
}, schemaOptions)

LeadSchema.index(
  { email: 1},
  { unique: true, message: 'Un prospect existe déjà avec cet email' });

/* eslint-disable prefer-arrow-callback */
LeadSchema.virtual('fullname').get(function() {
  return `${this.firstname || ''} ${this.lastname || ''}`
})

LeadSchema.virtual("company", {
  ref: "company", // The Model to use
  localField: "company_code", // Find in Model, where localField
  foreignField: "code", // is equal to foreignField
  justOne: true,
});

// Corresponding registered user if any
LeadSchema.virtual("registered_user", {
  ref: "user", // The Model to use
  localField: "email", // Find in Model, where localField
  foreignField: "email", // is equal to foreignField
});

LeadSchema.virtual('registered').get(function() {
  return !lodash.isEmpty(this.registered_user)
})

/* eslint-enable prefer-arrow-callback */

module.exports = LeadSchema
