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
    enum: ['component', 'button', 'menu'],
  },
  // Attributes
  attributes: [{
    name: String,
    value: String,
  }],
  // Available menu, i.e. {label: "Mon profil", id: 'profile'}
  menus: [{
    label: String,
    id: String,
  }],
}, {toJSON: {virtuals: true, getters: true}})

module.exports = UIConfigurationSchema
