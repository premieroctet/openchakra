const { isEmailOk } = require('../../../../utils/sms')

const { isPhoneOk } = require('../../../../utils/sms')
const mongoose = require('mongoose')
const { schemaOptions } = require('../../../utils/schemas')

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
    set: v => v.toLowerCase().trim(),
  },
  company_code: {
    type: String,
    set: v => v ? v.replace(/ /g,'') : v,
    required: false,
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
}, schemaOptions)

LeadSchema.index(
  { email: 1},
  { unique: true, message: 'Un prospect existe déjà avec cet email' });

/* eslint-disable prefer-arrow-callback */
// Required for register validation only
/* eslint-enable prefer-arrow-callback */

module.exports = LeadSchema
