const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const QuizzSchema = new Schema({
  message_under_33: {
    type: String,
  },
  message_under_66: {
    type: String,
  },
  message_under_100: {
    type: String,
  },
  message_100: {
    type: String,
  },
}, schemaOptions)


/* eslint-disable prefer-arrow-callback */
QuizzSchema.virtual('questions', {
  ref: 'question', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'quizz', // is equal to foreignField
})

/**
Right answers ratio. If a question has no answer, it is considered false
*/
QuizzSchema.virtual('percent_success', function(){
})

/**
Message depending on the percent success
*/
QuizzSchema.virtual('percent_message', function(){
})

/* eslint-enable prefer-arrow-callback */

module.exports = QuizzSchema
