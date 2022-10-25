const mongoose = require('mongoose')
const Schema = mongoose.Schema
const formatDuration = require('format-duration')
const ResourceSchema=require('./ResourceSchema')

const TraineeResourceSchema = new Schema({
  ...ResourceSchema.obj,
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
