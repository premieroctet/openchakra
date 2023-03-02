const mongoose = require('mongoose')
const moment=require('moment')
const {APPOINTMENT_OTHER, APPOINTMENT_TYPE, APPOINTMENT_NOTIF_DELAY} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  type: { // Heartbeat, Blood pressure
    type: String,
    enum: Object.keys(APPOINTMENT_TYPE),
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
  date: {
    type: Date,
    required: true,
  },
}, schemaOptions)

AppointmentSchema.virtual('type_str').get(function() {
  if (!this.type) {
    return null
  }
  if (this.type==APPOINTMENT_OTHER) {
    return this.otherTitle
  }
  return APPOINTMENT_TYPE[this.type]
})

AppointmentSchema.methods.shouldNotify = function() {
  const DMYHM_FMT='DDMMYYHHmm'
  const notif_moment=moment().add(APPOINTMENT_NOTIF_DELAY, 'minutes').format(DMYHM_FMT)
  return moment(this.date).format(DMYHM_FMT)==notif_moment
}


module.exports = AppointmentSchema
