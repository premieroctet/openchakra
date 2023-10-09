const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const QuizzSchema = new Schema({
}, schemaOptions)


/* eslint-disable prefer-arrow-callback */
QuizzSchema.virtual('questions', {
  ref: 'question', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'quizz', // is equal to foreignField
})
/* eslint-enable prefer-arrow-callback */

module.exports = QuizzSchema
