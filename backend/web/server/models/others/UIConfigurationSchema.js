const { schemaOptions } = require('../../utils/schemas');
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UIConfigurationSchema = new Schema({
  // Page name
  page: {
    type: String,
    required: true,
  },
  // Component label
  component: {
    type: String,
    required: true,
  },
  // Parameter path in CSS or whatever
  classname: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: false,
  },
  // Parameter type (color, font, text, picture)
  type: {
    type: String,
    required: true,
    // enum: ['attribute', 'component', 'button', 'menu', 'group', 'logo', 'searchbar'],
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
}, schemaOptions)

UIConfigurationSchema.virtual('type_label').get(function() {
  return this.type=='content' ? `${this.classname}.${this.type}` : this.classname
})

module.exports = UIConfigurationSchema
