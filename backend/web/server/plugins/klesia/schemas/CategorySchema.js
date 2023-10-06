const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  description: {
    type: String,
    required: [true, `La description est obligatoire`],
  },
  external_media: {
    type: String,
    required: false,
  },
  internal_media: {
    type: String,
    required: false,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: false,
  },
}, schemaOptions)

CategorySchema.virtual('media').get(function() {
  return this.external_media || this.internal_media
})

module.exports = CategorySchema
