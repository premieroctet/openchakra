const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')

const Schema = mongoose.Schema

const ResourceSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  short_name: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    default: 0,
    required: false,
  },
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'resource',
  },
}, schemaOptions)

ResourceSchema.virtual('spent_time_str').get(() => {
  return null
})

ResourceSchema.virtual('status').get(() => {
  return null
})

ResourceSchema.virtual('annotation').get(() => {
  return null
})

module.exports = ResourceSchema
