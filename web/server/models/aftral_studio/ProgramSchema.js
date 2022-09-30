const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const {getMangopayMessage} = require('../../../utils/i18n')
const {hideIllegal} = require('../../../utils/text')
const {ACCOUNT_MIN_AGE}=require('../../../utils/consts')

const ProgramSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  // duration in hours
  duration: {
    type: Number,
    required: true,
    set: v => v ? parseInt(v) : v
  },
  modules: [{
    type: Schema.Types.ObjectId,
    ref: 'module',
    required: false,
  }],
}, {toJSON: {virtuals: true, getters: true}})

module.exports = ProgramSchema
