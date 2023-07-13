const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

// Pip => pépin
const PipSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  // Beurre dans les connaissances
  trick: {
    type: String,
    required: [true, 'L\'astuce est obligatoire'],
  },
  theme: {
    type: String,
    required: [true, 'Le thème est obligatoire'],
  },
  picture: {
    type: String,
    required: false,
  },
  context: {
    type: String,
    required: [true, 'Le contexte est obligatoire'],
  },
  spoons: {
    type: Number,
    required: [true, 'Le nombre de cuillères est obligatoire'],
  },
  // Cerise sur le gateau
  detail: {
    type: String,
    required: [true, 'Le détail est obligatoire'],
  },
  hard: {
    type: Boolean,
    required: [true, 'La difficulté est obligatoire'],
  },
  // Grain de sel
  explanation: {
    type: String,
    required: false,
  },
}, schemaOptions)

PipSchema.virtual('comments', {
  ref: "comment", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "pip", // is equal to foreignField
  match: {parent: null},
});

PipSchema.virtual('comments_count').get(function() {
  return this.comments?.length || 0
})

module.exports = PipSchema
