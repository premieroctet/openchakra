const {
  CREATED_AT_ATTRIBUTE,
  UPDATED_AT_ATTRIBUTE
} = require('../../../../utils/consts')
const { QUIZZ_QUESTION_TYPE, SURVEY_ANSWER } = require('../consts')
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
    ...lodash.omit(this.toObject(), ['_id', 'id', CREATED_AT_ATTRIBUTE, UPDATED_AT_ATTRIBUTE]),
    diet: undefined,
  }
  return mongoose.models.quizzQuestion.create(params)
}
/* eslint-enable prefer-arrow-callback */


module.exports = QuizzQuestionSchema
