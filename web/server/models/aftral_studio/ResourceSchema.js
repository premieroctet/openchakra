const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResourceSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  short_name: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    default: 0,
    required: false,
  },
  // Store millis, return seconds
  spent_time: {
    type: Number,
    default: 0,
    get: v => (v||0)/1000,
    required: false,
  },
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'resource',
  },
}, {toJSON: {virtuals: true, getters: true}})

module.exports = ResourceSchema
