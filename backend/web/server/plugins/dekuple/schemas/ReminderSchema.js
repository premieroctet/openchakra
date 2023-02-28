const mongoose = require('mongoose')
const lodash=require('lodash')
const moment=require('moment')
const {schemaOptions} = require('../../../utils/schemas')
const {REMINDER_TYPE, REMINDER_OTHER} = require('../consts')

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
    required: [true,'La date est obligatoire'],
  },
  // TODO: UGLY !!!
  monday: {
    type: Boolean,
    required: false,
  },
  tuesday: {
    type: Boolean,
    required: false,
  },
  wednesday: {
    type: Boolean,
    required: false,
  },
  thursday: {
    type: Boolean,
    required: false,
  },
  friday: {
    type: Boolean,
    required: false,
  },
  saturday: {
    type: Boolean,
    required: false,
  },
  sunday: {
    type: Boolean,
    required: false,
  },
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

ReminderSchema.virtual('reccurency_str').get(function() {
  const DAYS=lodash.range(7).map(d => ['en', 'fr'].map(l =>moment().weekday(d).locale(l).format('dddd').toLowerCase()))
  const trueDays=DAYS.filter(([en, r]) => this[en]).map(([en, fr])=>`${fr}s`)
  return `Tous les ${trueDays.join(', ').replace(/, ([^,]*)$/, ' et $1')}`
})

ReminderSchema.methods.shouldLaunch = function() {
  moment.locale('en')
  const now=moment()
  const nowDayOfWeek=now.format('dddd').toLowerCase()//.locale('en')
  // Check day
  if (!this[nowDayOfWeek]) {
    return false
  }
  // Check hour minutes
  const HOURMIN_FMT='HHmm'
  return now.format(HOURMIN_FMT)==moment(this.time).format(HOURMIN_FMT)
}

module.exports = ReminderSchema
