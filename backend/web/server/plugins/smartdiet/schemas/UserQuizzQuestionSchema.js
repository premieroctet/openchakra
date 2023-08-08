const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const { SURVEY_ANSWER } = require('../consts')

const Schema = mongoose.Schema

const UserQuizzQuestionSchema = new Schema({
  quizz_question: {
    type: Schema.Types.ObjectId,
    ref: 'quizzQuestion',
    required: [true, 'La question modèle est obligatoire'],
  },
  boolean_answer: {
    type: Boolean,
  },
  scale_1_10_answer: {
    type: Number,
    min: [1, 'La réponse doit être comprise entre 1 et 10'],
    max: [10, 'La réponse doit être comprise entre 1 et 10'],
  },
  text_answer: {
    type: String,
  },
  document_answer: {
    type: String,
  },
  numeric_answer: {
    type: Number,
  },
  single_enum_answer: [{
      type: String,
  }],
  multiple_enum_answer: [{
      type: String,
  }],

}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
UserQuizzQuestionSchema.virtual('order', {localField:'tagada', foreigneField: 'tagada'}).get(function() {
  return 0
})
/* eslint-enable prefer-arrow-callback */


module.exports = UserQuizzQuestionSchema
