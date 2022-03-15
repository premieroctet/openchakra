const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ROLES}=require('../../../utils/consts')

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
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  sms_code: {
    type: String,
  },
  billing_address: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    country: {
      type: String,
    },
    gps: {
      lat: Number,
      lng: Number,
    },
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
  is_confirmed: {
    type: Boolean,
    default: false,
  },
  phone_confirmed: {
    type: Boolean,
    default: false,
  },
  last_login: [{
    type: Date,
  }],
  is_admin: {
    type: Boolean,
    default: false,
  },
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
  // Comments for admins
  comment: String,
}, {toJSON: {virtuals: true, getters: true}})

UserSchema.virtual('avatar_letters').get(function() {
  const first_letter = this.firstname ? this.firstname.charAt(0) : ''
  const second_letter = this.name ? this.name.charAt(0) : ''
  return (first_letter + second_letter).toUpperCase()
})

UserSchema.virtual('full_name').get(function() {
  return `${this.firstname} ${this.name}`
})

module.exports = UserSchema
