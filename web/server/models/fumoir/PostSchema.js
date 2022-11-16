const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  post: {
    type: String,
    required: true,
  },
  media: [{
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

})

module.exports = PostSchema
