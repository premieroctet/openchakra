const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const { SURVEY_ANSWER } = require('../consts')

const Schema = mongoose.Schema

const UserQuestionSchema = new Schema({
  survey: {
    type: Schema.Types.ObjectId,
    ref: 'userSurvey',
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'question',
    required: true,
  },
  // Redundant with Question but useful
  order: {
    type: Number,
    required: [true, "L'ordre est obligatoire"],
  },
  answer: {
    type:  String,
    enum: Object.keys(SURVEY_ANSWER),
    required: false,
  }

}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
/* eslint-enable prefer-arrow-callback */


module.exports = UserQuestionSchema
