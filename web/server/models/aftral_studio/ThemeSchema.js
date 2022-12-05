const mongoose = require('mongoose')
const lodash=require('lodash')
const {ROLES} = require('../../../utils/aftral_studio/consts')
const {schemaOptions} = require('../../utils/schemas')
const {cloneArray} = require('../../utils/database')

const Schema = mongoose.Schema

const ThemeSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  ordered: {
    type: Boolean,
    default: true,
    required: true,
  },
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'resource',
    required: true,
  }],
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'resource',
    default: null,
  },
}, schemaOptions)

ThemeSchema.virtual('spent_time_str').get(() => {
  return null
})

ThemeSchema.virtual('progress_str').get(() => {
  return null
})

ThemeSchema.virtual('progress_percent').get(() => {
  return null
})

ThemeSchema.virtual('hidden').get(function() {
  return (!this.name && !this.code && !this.picture)
})

ThemeSchema.virtual('status').get(() => {
  return null
})

module.exports = ThemeSchema
