const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')
const Schema = mongoose.Schema

const ReminderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  type: { // Heartbeat, Blood pressure
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  time: { // Only use time part of the date
    type: Date,
    required: true,
  },
  days: [{
    type: Number,
    min: 0,
    max: 6,
    required: true,
  }],
}, schemaOptions)

module.exports = ReminderSchema
