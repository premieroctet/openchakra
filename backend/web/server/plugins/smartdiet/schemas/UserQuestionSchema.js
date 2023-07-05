const { idEqual } = require('../../../utils/database')
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
UserQuestionSchema.virtual('index').get(function(){
  return this.survey?.questions?.findIndex(q => idEqual(q._id, this._id))+1 || 0
})

UserQuestionSchema.virtual('total').get(function(){
  return this.survey?.questions?.length || 0
})
/* eslint-enable prefer-arrow-callback */


module.exports = UserQuestionSchema
