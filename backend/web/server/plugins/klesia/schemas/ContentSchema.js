const mongoose = require('mongoose')
const lodash = require('lodash')
const {SEASON} = require('../consts')
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
    required: [true, `L'extrait' est obligatoire`],
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
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
ContentSchema.virtual('media').get(function() {
  return this.external_media || this.internal_media
})

ContentSchema.virtual('thumbnail').get(function() {
  return this.external_thumbnail || this.internal_thumbnail
})

ContentSchema.virtual('type').get(function() {
  return this.__t
})

ContentSchema.virtual('extra_info').get(function() {
  if (this.type=='module') {
    const contents_length=this.contents?.length
    if (!lodash.isNil(contents_length)) {
      return `${contents_length} contenu(s)`
    }
  }
})

ContentSchema.virtual('steps', {
  ref: 'step', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'container', // is equal to foreignField
  options: {sort: {order: 1}},
})

/* eslint-enable prefer-arrow-callback */

module.exports = ContentSchema
