const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  media: [{ // url S3
    type: String,
  }],
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

}, schemaOptions)

module.exports = PostSchema
