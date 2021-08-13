const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UIConfigurationSchema = new Schema({
  // Parameter name
  page: {
    type: String,
    required: true,
  },
  // Comopnent label
  label: {
    type: String,
    required: true,
  },
  // Parameter path in CSS or whatever
  className: {
    type: String,
    required: true,
  },
  // Parameter type (color, font, text, picture)
  type: {
    type: String,
    required: true,
    enum: ['component', 'button', 'menu', 'group', 'logo', 'searchbar'],
  },
  // In case of type "group"
  componentType: {
    type: String,
    required: false,
  },
  // Attributes
  attributes: [{
    name: String,
    value: String,
  }],
  // In case of type "group"
  components: [{
    label: String,
    id: String,
  }],
}, {toJSON: {virtuals: true, getters: true}})

module.exports = UIConfigurationSchema
