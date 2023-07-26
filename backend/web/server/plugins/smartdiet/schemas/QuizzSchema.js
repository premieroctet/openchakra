const { QUIZZ_TYPE } = require('../consts')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const QuizzSchema = new Schema({
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
    required: false,
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'quizzQuestion',
    required: true,
  }],
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
/* eslint-enable prefer-arrow-callback */


module.exports = QuizzSchema
