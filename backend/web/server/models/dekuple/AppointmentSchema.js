const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')
const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
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
  date: {
    type: Date,
    required: true,
  },
}, schemaOptions)

module.exports = AppointmentSchema
