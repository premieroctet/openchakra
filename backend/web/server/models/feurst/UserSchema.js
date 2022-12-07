const { schemaOptions } = require('../../utils/schemas');
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const {ROLES}=require('../../../utils/feurst/consts')

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    set: v => v.toLowerCase().trim(),
  },
  active: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    default: 'INVALID',
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  last_login: [{
    type: Date,
  }],
  resetToken: {
    type: Schema.Types.ObjectId,
    ref: 'resetToken',
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
  },
  roles: [{
    type: String,
    enum: Object.keys(ROLES),
  }],
  // User CGV validation date
  cgv_validation_date: {
    type: Date,
  },
  // Comments for admins
  comment: String,
}, schemaOptions)

UserSchema.virtual('avatar_letters').get(function() {
  const first_letter = this.firstname ? this.firstname.charAt(0) : ''
  const second_letter = this.name ? this.name.charAt(0) : ''
  return (first_letter + second_letter).toUpperCase()
})

UserSchema.virtual('full_name').get(function() {
  return `${this.firstname} ${this.name}`
})

// For Feurst ADV/sales
UserSchema.virtual('companies', {
  ref: 'company', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'sales_representative', // is equal to foreignField
})

// TODO: later may be false after a timeout (i.e. 3 months)
UserSchema.virtual('cgv_valid').get(function() {
  return !!this.cgv_validation_date
})

module.exports = UserSchema
