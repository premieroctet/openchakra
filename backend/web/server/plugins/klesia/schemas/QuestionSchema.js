const mongoose = require('mongoose')
const {QUESTION_TYPE} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const QuizzQuestionSchema = new Schema({
  quizz: {
    type: Schema.Types.ObjectId,
    ref: 'quizz',
    required: [true, `Le quizz est obligatoire`],
  },
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
  },
  type: {
    type: String,
    enum: Object.keys(QUESTION_TYPE),
    required: [true, 'Le type est obligatoire'],
  },
  // The correct answer for a single QCM
  correct_answer: {
    type: Schema.Types.ObjectId,
    ref: 'answer',
    required: false,
  },
  success_message: {
    type: String,
    required: false,
  },
  error_message: {
    type: String,
    required: false,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
QuizzQuestionSchema.virtual('available_answers', {
  ref: 'answer', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'question', // is equal to foreignField
})

QuizzQuestionSchema.virtual('user_choice_answers', function() {
})

QuizzQuestionSchema.virtual('user_text_answer', function() {
})

QuizzQuestionSchema.virtual('user_numeric_answer', function() {
})

/** Was the answer correct ? */
QuizzQuestionSchema.virtual('correct', function() {
})

/** Success or error message depending on correctness */
QuizzQuestionSchema.virtual('message', function() {
})


/* eslint-enable prefer-arrow-callback */


module.exports = QuizzQuestionSchema
