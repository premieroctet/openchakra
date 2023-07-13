const { schemaOptions } = require('../../../utils/schemas')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CoachingQuestionSchema = new Schema({
  label: {
    type: String,
    required: [true, 'Le libellé est obligatoire'],
  },
  key: {
    type: Schema.Types.ObjectId,
    ref: 'key',
    required: [true, 'La clé est obligatoire'],
  },

}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
// Required for register validation only

/* eslint-enable prefer-arrow-callback */


module.exports = CoachingQuestionSchema
