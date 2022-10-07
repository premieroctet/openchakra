const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResourceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  short_name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
}, {toJSON: {virtuals: true, getters: true}})

module.exports = ResourceSchema
