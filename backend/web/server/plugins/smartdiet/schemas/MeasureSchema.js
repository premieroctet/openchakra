const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const MeasureSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'La date est obligatoire']
  },
  chest: {
    type: Number,
    required: false,
  },
  waist: {
    type: Number,
    required: false,
  },
  hips: {
    type: Number,
    required: false,
  },
  thighs: {
    type: Number,
    required: false,
  },
  measures_arms: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Le patient est obligatoire'],
  },
}, schemaOptions)

module.exports = MeasureSchema
