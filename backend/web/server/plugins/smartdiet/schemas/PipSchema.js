const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

// Pip => pépin
const PipSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  trick: {
    type: String,
    required: [true, 'L\'astuce est obligatoire'],
  },
  theme: {
    type: String,
    required: [true, 'Le thème est obligatoire'],
  },
  context: {
    type: String,
    required: [true, 'Le contexte est obligatoire'],
  },
  spoons: {
    type: Number,
    required: [true, 'Le nombre de cuillères est obligatoire'],
  },
  detail: {
    type: String,
    required: [true, 'Le détail est obligatoire'],
  },
  hard: {
    type: Boolean,
    required: [true, 'La difficulté est obligatoire'],
  },
  proof: {
    type: String,
    required: false,
  },
  explanation: {
    type: String,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
}, schemaOptions)

module.exports = PipSchema
