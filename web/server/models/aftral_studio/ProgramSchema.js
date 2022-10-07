const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProgramSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  // duration in hours
  duration: {
    type: Number,
    required: true,
    set: v => (v ? parseInt(v) : v),
  },
  designer: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  themes: [{
    type: Schema.Types.ObjectId,
    ref: 'theme',
    required: false,
  }],

}, {toJSON: {virtuals: true, getters: true}})

module.exports = ProgramSchema
