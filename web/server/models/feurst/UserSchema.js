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

// Registered => has firstname, name, email, birthday, password, address
UserSchema.virtual('is_registered').get(() => {
  return true
})

// For Feurst ADV/sales
UserSchema.virtual('companies', {
  ref: 'company', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'sales_representative', // is equal to foreignField
})


module.exports = UserSchema
