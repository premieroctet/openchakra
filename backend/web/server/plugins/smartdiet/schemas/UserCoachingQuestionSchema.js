const { schemaOptions } = require('../../../utils/schemas')
const mongoose = require('mongoose')
const {
  COACHING_QUESTION_STATUS,
  COACHING_QUESTION_STATUS_NOT_ADDRESSED
} = require('../consts')

const Schema = mongoose.Schema

const UserCoachingQuestionSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'coachingQuestion',
    required: [true, 'La question est obligatoire'],
  },
  status: {
    type: String,
    enum: Object.keys(COACHING_QUESTION_STATUS),
    default: COACHING_QUESTION_STATUS_NOT_ADDRESSED,
    required: [true, 'Le statut est obligatoire'],
  },

}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
// Required for register validation only

/* eslint-enable prefer-arrow-callback */


module.exports = UserCoachingQuestionSchema
