const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const StepSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
  },
  description: {
    type: String,
    required: false,
  },
  external_media: {
    type: String,
    required: false,
  },
  internal_media: {
    type: String,
    required: false,
  },
  container: {
    type: Schema.Types.ObjectId,
    ref: 'content',
    required: [true, `Le parent est obligatoire`],
  },
  order: {
    type: Number,
    required: [true, `L'ordre est obligatoire`],
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
/* eslint-enable prefer-arrow-callback */

module.exports = StepSchema
