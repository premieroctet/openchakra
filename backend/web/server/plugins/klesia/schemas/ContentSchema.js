const mongoose = require('mongoose')
const {CONTENT_TYPE, SEASON} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const ContentSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Le créateur est obligatoire'],
  },
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
  },
  external_media: {
    type: String,
    required: false,
  },
  internal_media: {
    type: String,
    required: false,
  },
  external_thumbnail: {
    type: String,
    required: false,
  },
  internal_thumbnail: {
    type: String,
    required: false,
  },
  excerpt: {
    type: String,
    required: [true, `Le résumé est obligatoire`],
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  }],
  // read duration in minutes
  read_duration: {
    type: Number,
    required: false,
  },
  season: {
    type: 'String',
    set: v => v || undefined,
    enum: Object.keys(SEASON),
    required: false,
  }
}, schemaOptions)

ContentSchema.virtual('media').get(function() {
  return this.external_media || this.internal_media
})

ContentSchema.virtual('thumbnail').get(function() {
  return this.external_thumbnail || this.internal_thumbnail
})

ContentSchema.virtual('type').get(function() {
  return this._type
})

module.exports = ContentSchema
