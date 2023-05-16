const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const lodash=require('lodash')
const {COMPANY_ACTIVITY, COMPANY_SIZE}=require('../consts')

const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    text: {
      type: String,
      required: [true, 'Le commentaire est obligatoire'],
    },
    note: {
      type: Number,
    },
    pip: {
      type: Schema.Types.ObjectId,
      ref: 'pip',
      required: false,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'comment',
      required: false,
    },
    content: {
      type: Schema.Types.ObjectId,
      ref: 'content',
      required: false,
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
  },
  schemaOptions,
)

module.exports = CommentSchema
