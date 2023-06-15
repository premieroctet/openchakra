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
      required: [true, "L'utilisateur est obligatoire"],
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
    content: {
      type: Schema.Types.ObjectId,
      ref: 'content',
      required: false,
    },
    // Parent comment (i.e a comment of a comment)
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'comment',
      required: false,
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
  },
  schemaOptions,
)

// Returns my reviewz
CommentSchema.virtual('children', {
  ref: 'comment', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'parent', // is equal to foreignField
})


module.exports = CommentSchema
