const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {HOME_STATUS, CONTENTS_TYPE} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')
const { DUMMY_REF } = require('../../../utils/database')

const Schema = mongoose.Schema

const ContentSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Le créateur est obligatoire'],
  },
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  // default==true =>Contents available for every user
  default: {
    type: Boolean,
    required: [true, 'Le status "default" est obligatoire'],
  },
  picture: {
    type: String,
    required: [true, 'L\'illustration est obligatoire'],
  },
  type: {
    type: String,
    enum: Object.keys(CONTENTS_TYPE),
    required: [true, 'Le type est obligatoire'],
  },
  contents: {
    type: String,
    required: [true, 'Le contenu est obligatoire'],
  },
  duration: {
    type: Number,
    required: [true, 'La durée est obligatoire'],
  },
  key: {
    type: Schema.Types.ObjectId,
    ref: 'key',
    required: [true, 'La clé est obligatoire'],
  },
  viewed_by: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  // Targets: specificity/objectives
  targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  pins: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  shares: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  url: {
    type: String,
    required: false,
  },
  extra_url: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: false,
    required: true,
  },
  source: {
    type: String,
    required: false,
  },
  dummy: {
    type: Number,
    default: 0,
    required: true,
  },
  linked_contents: [{
    type: Schema.Types.ObjectId,
    ref: 'content',
    required: true,
  }],
  migration_id: {
    type: Number,
    index: true,
    required: false,
  },
  liked: {
    type: Boolean,
  },
  pinned: {
    type: Boolean,
  },
}, schemaOptions)

ContentSchema.virtual('likes_count', DUMMY_REF).get(function() {
  return this.likes?.length || 0
})

ContentSchema.virtual('shares_count', DUMMY_REF).get(function() {
  return this.shares?.length || 0
})

ContentSchema.virtual('comments', {
  ref: "comment", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "content", // is equal to foreignField
  match: {parent: null},
});

ContentSchema.virtual('comments_count', {
  ref: "comment", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "content", // is equal to foreignField
  match: {parent: null},
  count: true,
});

ContentSchema.virtual("search_text", DUMMY_REF).get(function() {
  const attributes='name,contents'.split(',')
  let values=attributes.map(att => this[att])
  values=values.filter(v=>!!v)
  return values.join(' ')
});

module.exports = ContentSchema
