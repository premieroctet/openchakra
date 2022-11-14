const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProgramSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  // duration in hours
  duration: {
    type: Number,
    required: true,
    default: 0,
    set: v => (v ? parseInt(v) : v),
  },
  ordered: {
    type: Boolean,
    default: true,
    required: true,
  },
  designer: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: false,
  },
  themes: [{
    type: Schema.Types.ObjectId,
    ref: 'theme',
    required: false,
  }],
  published: {
    type: Boolean,
    default: false,
  },
}, {toJSON: {virtuals: true, getters: true}})

module.exports = ProgramSchema
