const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')
const {REMINDER_TYPE, REMINDER_OTHER} = require('../../../utils/dekuple/consts')

const Schema = mongoose.Schema

const ReminderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  type: { // Heartbeat, Blood pressure
    type: String,
    enum: Object.keys(REMINDER_TYPE),
    required: true,
  },
  otherTitle: {
    type: String,
    required: false,
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

ReminderSchema.virtual('type_str').get(function() {
  if (!this.type) {
    return null
  }
  if (this.type==REMINDER_OTHER) {
    return this.otherTitle
  }
  return REMINDER_TYPE[this.type]
})


module.exports = ReminderSchema
