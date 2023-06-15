const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const ChartPointSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'La date est obligatoire'],
  },
  value_1: {
    type: Number,
    required: [true, 'La valeur 1 est obligatoire'],
  },
}, schemaOptions)

module.exports = ChartPointSchema
