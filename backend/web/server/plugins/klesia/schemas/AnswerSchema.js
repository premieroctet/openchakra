const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'question',
    required: [true, `La question est obligatoire`],
  },
  value: {
    type: String,
    required: [true, `La valeur de la réponse est obligatoire`],
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
/* eslint-enable prefer-arrow-callback */

module.exports = AnswerSchema
