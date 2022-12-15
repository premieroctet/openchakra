const { schemaOptions } = require('../../utils/schemas');
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
    set: pass => bcrypt.hashSync(pass, 10),
  },
}, schemaOptions)

module.exports = UserSchema
