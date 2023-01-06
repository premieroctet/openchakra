const mongoose = require('mongoose')
const {MEASURE_TYPE} = require('../../../utils/dekuple/consts')
const {schemaOptions} = require('../../utils/schemas')
const Schema = mongoose.Schema

const MeasureSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: Object.keys(MEASURE_TYPE),
    required: true,
  },
  sys: {
    type: Number,
    required: false,
  },
  dia: {
    type: Number,
    required: false,
  },
  heartbeat: { // BPM
    type: Number,
    required: false,
  },
}, schemaOptions)

module.exports = MeasureSchema
