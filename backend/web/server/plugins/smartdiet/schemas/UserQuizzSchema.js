const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const { SURVEY_ANSWER } = require('../consts')

const Schema = mongoose.Schema

const UserQuizzSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  quizz: {
    type: Schema.Types.ObjectId,
    ref: 'quizz',
    required: true,
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'userQuizzQuestion',
    required: true,
  }],
}, schemaOptions)

module.exports = UserQuizzSchema
