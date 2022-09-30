const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const {getMangopayMessage} = require('../../../utils/i18n')
const {hideIllegal} = require('../../../utils/text')
const {ACCOUNT_MIN_AGE}=require('../../../utils/consts')

const maxBirth=new Date(moment().add(-ACCOUNT_MIN_AGE, 'years'))

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
  },
  role: {
    type: String,
    required: true,
  }
}, {toJSON: {virtuals: true, getters: true}})

module.exports = UserSchema
