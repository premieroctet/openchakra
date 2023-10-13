const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const QuizzSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
}, schemaOptions)

/* eslint-enable prefer-arrow-callback */

QuizzSchema.virtual('questions', {
  ref: 'question', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'quizz', // is equal to foreignField
})

module.exports = QuizzSchema
