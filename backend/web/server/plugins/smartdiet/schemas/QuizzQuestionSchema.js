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
  // Title for synthesis
  synthesis_label: {
    type: String
  },
  // Category
  category: {
    type: String
  },
  type: {
    type: String,
    enum: Object.keys(QUIZZ_QUESTION_TYPE),
    required: [true, 'Le type est obligatoire'],
  },
  // The correct answer for a single QCM
  correct_answer: {
    type: Schema.Types.ObjectId,
    ref: 'item',
    required: false,
  },
  // Message if answer is correct
  success_message: {
    type: String,
    required: false,
  },
  // Message if answer is wrong
  error_message: {
    type: String,
    required: false,
  },
  diet_private: {
  },
  migration_id: {
    type: Number,
    required: false,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */

QuizzQuestionSchema.virtual("available_answers", {
  ref: "item", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: 'quizzQuestion' // is equal to foreignField
});

QuizzQuestionSchema.methods.cloneAsUserQuestion=function() {
  const params={
    quizz_question: this._id,
    ...lodash.omit(this.toObject(), ['_id', 'id', CREATED_AT_ATTRIBUTE, UPDATED_AT_ATTRIBUTE]),
    diet: undefined,
  }
  const model=mongoose.model('userQuizzQuestion')
  return model.create(params)
}
/* eslint-enable prefer-arrow-callback */


module.exports = QuizzQuestionSchema
