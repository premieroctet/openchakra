const {
  idEqual,
  setIntersects,
  shareTargets
} = require('../../../utils/database')
const mongoose = require('mongoose')
const moment=require('moment')
const { ForbiddenError } = require('../../../utils/errors')
const {schemaOptions} = require('../../../utils/schemas')
const lodash=require('lodash')
const bcrypt = require('bcryptjs')
const {ROLES, ROLE_CUSTOMER}=require('../consts')
const Schema = mongoose.Schema
const { isEmailOk, isPhoneOk } = require('../../../../utils/sms')

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
    set: v => v ? v.toLowerCase().trim() : v,
    validate: [function(v) {v && isEmailOk(v)}, "L'email est invalide"],
  },
  phone: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: [function() { return this.role==ROLE_CUSTOMER }, 'La compagnie est obligatoire'],
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    set: pass => bcrypt.hashSync(pass, 10),
  },
  role: {
    type: String,
    enum: Object.keys(ROLES),
    default: ROLE_CUSTOMER,
    required: [true, 'Le rôle est obligatoire'],
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  }
}, schemaOptions)
/* eslint-disable prefer-arrow-callback */

// Mail unicity
UserSchema.index(
  { email: 1},
  { unique: true, message: 'Un compte avec ce mail existe déjà' });

UserSchema.virtual('password2').get(function() {})
/* eslint-enable prefer-arrow-callback */

module.exports = UserSchema
