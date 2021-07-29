const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UIConfigurationSchema = new Schema({
  // Parameter name
  page: {
    type: String,
    required: true,
  },
  // Parameter name
  name: {
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
    enum: ['color', 'font', 'text', 'picture'],
  },

  value: {
    type: String,
    required: true,
  },
}, {toJSON: {virtuals: true, getters: true}})

UIConfigurationSchema.virtual('color_value').get(function() {
  return this.type=='color' ? this.value : null
})

UIConfigurationSchema.virtual('font_value').get(function() {
  return this.type=='font' ? this.value : null
})

UIConfigurationSchema.virtual('text_value').get(function() {
  return this.type=='text' ? this.value : null
})

UIConfigurationSchema.virtual('picture_value').get(function() {
  return this.type=='picture' ? this.value : null
})

module.exports = UIConfigurationSchema
