const { cloneArray } = require('../../utils/database')
const mongoose = require('mongoose')
const lodash=require('lodash')

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
    required: false,
  }],
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'resource',
  },
}, {toJSON: {virtuals: true, getters: true}})


ThemeSchema.virtual('hidden').get(function() {
  return (!this.name && !this.code && !this.picture)
})

ThemeSchema.virtual('spent_time').get(function() {
  return lodash.sum(this.resources.map(t => t.spent_time || 0))
})

module.exports = ThemeSchema
