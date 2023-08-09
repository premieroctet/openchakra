const {
  CREATED_AT_ATTRIBUTE,
  UPDATED_AT_ATTRIBUTE
} = require('../../../../utils/consts')
const {
  QUIZZ_QUESTION_TYPE, SURVEY_ANSWER, QUIZZ_QUESTION_TYPE_ENUM_SINGLE,
  QUIZZ_QUESTION_TYPE_ENUM_MULTIPLE,
 } = require('../consts')
const mongoose = require('mongoose')
const lodash = require('lodash')
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
  enum_values: [{
    type: String,
    required: [
      function() { return [QUIZZ_QUESTION_TYPE_ENUM_SINGLE, QUIZZ_QUESTION_TYPE_ENUM_MULTIPLE].includes(this.type)},
      'Les réponses possibles sont obligatoires pour un QCM'
    ],
  }],
  diet_private: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: false,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
QuizzQuestionSchema.methods.cloneAsUserQuestion=function() {
  const params={
    quizz_question: this,
    ...lodash.omit(this.toObject(), ['_id', 'id', CREATED_AT_ATTRIBUTE, UPDATED_AT_ATTRIBUTE]),
    diet: undefined,
  }
  return mongoose.models.userQuizzQuestion.create(params)
}
/* eslint-enable prefer-arrow-callback */


module.exports = QuizzQuestionSchema
