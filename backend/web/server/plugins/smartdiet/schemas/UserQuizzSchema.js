const { QUIZZ_TYPE, SURVEY_ANSWER } = require('../consts')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const UserQuizzSchema = new Schema({
  // Reference quizz
  quizz: {
    type: Schema.Types.ObjectId,
    ref: 'quizz',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  type: {
    type: String,
    enum: Object.keys(QUIZZ_TYPE),
    required: [true, 'Le type est obligatoire'],
  },
  key: {
    type: Schema.Types.ObjectId,
    ref: 'key',
    //required: [true, 'La clé est obligatoire'],
    required: false,
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'userQuizzQuestion',
    required: true,
  }],
}, schemaOptions)

module.exports = UserQuizzSchema
