const { QUIZZ_QUESTION_TYPE, SURVEY_ANSWER } = require('../consts')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const QuizzQuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
  },
  type: {
    type: String,
    enum: Object.keys(QUIZZ_QUESTION_TYPE),
    required: [true, 'Le type est obligatoire'],
  },
  index: {
    type: Number,
    required: [true, "L'index de la question est obligatoire"],
  },
  enum_values: [{
    type: String,
  }],
  diet_private: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: false,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
/* eslint-enable prefer-arrow-callback */


module.exports = QuizzQuestionSchema
