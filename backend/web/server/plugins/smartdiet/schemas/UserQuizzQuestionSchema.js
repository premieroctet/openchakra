const {
  ANSWER_STATUS_CORRECT,
  ANSWER_STATUS_UNCORRECT,
  SURVEY_ANSWER
} = require('../consts')
const { idEqual, DUMMY_REF } = require('../../../utils/database')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const UserQuizzQuestionSchema = new Schema({
  quizz_question: {
    type: Schema.Types.ObjectId,
    ref: 'quizzQuestion',
    required: [true, 'La question modèle est obligatoire'],
  },
  comment: {
    type: String,
    required: false,
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
  single_enum_answer: {
    type: Schema.Types.ObjectId,
    ref: 'item',
    required: false,
  },
  qcm_answers: [{
    type: Schema.Types.ObjectId,
    ref: 'item',
    required: false,
  }],
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
UserQuizzQuestionSchema.virtual('order', DUMMY_REF).get(function() {
  return 0
})

UserQuizzQuestionSchema.virtual("multiple_answers", {
  ref: "item", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: 'userQuizzQuestion' // is equal to foreignField
});

// Message depending on success/error
UserQuizzQuestionSchema.virtual("answer_status", DUMMY_REF).get(function()  {
  if (this.single_enum_answer && this.quizz_question.correct_answer) {
    const correct=idEqual(this.single_enum_answer._id, this.quizz_question.correct_answer._id)
    return correct ? ANSWER_STATUS_CORRECT : ANSWER_STATUS_UNCORRECT
  }
})

// Message depending on success/error
UserQuizzQuestionSchema.virtual("answer_message", DUMMY_REF).get(function()  {
  const question=this.quizz_question
  if (!question) {
    //console.warn(`${this._id}:could not get quizz_question`)
    return
  }
  const MESSAGES={
    [ANSWER_STATUS_CORRECT]: question.success_message,
    [ANSWER_STATUS_UNCORRECT]: question.error_message,
  }
  return MESSAGES[this.answer_status]
})


/* eslint-enable prefer-arrow-callback */


module.exports = UserQuizzQuestionSchema
