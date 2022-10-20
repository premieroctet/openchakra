const mongoose = require('mongoose')
const Schema = mongoose.Schema
const formatDuration = require('format-duration')

const TraineeResourceSchema = new Schema({
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
  spent_time: {
    type: Number,
    default: 0,
  },
}, {toJSON: {virtuals: true, getters: true}})

TraineeResourceSchema.virtual('spent_time_str').get(function() {
  const timeMillis=this.spent_time||0
  return formatDuration(timeMillis, {leading: true})
})

module.exports = TraineeResourceSchema
