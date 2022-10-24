const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')


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
    set: v => v.toLowerCase().trim(),
  },
  password: {
    type: String,
    required: true,
    default: 'invalid',
    set: pass => bcrypt.hashSync(pass, 10)
  },
  role: {
    type: String,
    required: true,
  },
  sessions: [{
    type: Schema.Types.ObjectId,
    ref: 'traineeSession',
    required: true,
  }]
}, {toJSON: {virtuals: true, getters: true}})

module.exports = UserSchema
