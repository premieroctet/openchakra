const mongoose = require('mongoose')
const Schema = mongoose.Schema
const formatDuration = require('format-duration')

const TraineeResourceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  short_name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  spent_time: {
    type: Number,
    default: 0,
  },
}, {toJSON: {virtuals: true, getters: true}})

TraineeResourceSchema.virtual('spent_time_str').get(function() {
  const timeMillis=this.spent_time
  return formatDuration(timeMillis, {leading: true})
})

module.exports = TraineeResourceSchema
