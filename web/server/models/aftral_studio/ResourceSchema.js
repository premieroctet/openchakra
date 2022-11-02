const mongoose = require('mongoose')
const Schema = mongoose.Schema
const formatDuration = require('format-duration')

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
    required: false,
  },
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'resource',
  },
}, {toJSON: {virtuals: true, getters: true}})

ResourceSchema.virtual('spent_time_str').get(function() {
  const timeMillis=this.spent_time||0
  return formatDuration(timeMillis, {leading: true})
})

module.exports = ResourceSchema
