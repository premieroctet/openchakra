const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UIConfigurationSchema = new Schema({
  // Parameter name
  page: {
    type: String,
    required: true,
  },
  // Parameter path in CSS or whatever
  style_path: {
    type: String,
    required: true,
  },
  // Parameter label
  label: {
    type: String,
    required: true,
  },
  // Parameter type (color, font, text, picture)
  type: {
    type: String,
    required: true,
    enum: ['color', 'font', 'text', 'picture', 'menu', 'visibility'],
  },
  value: {
    type: String,
    required: true,
  },
}, {toJSON: {virtuals: true, getters: true}})

module.exports = UIConfigurationSchema
