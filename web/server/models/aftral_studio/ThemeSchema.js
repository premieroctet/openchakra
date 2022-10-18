const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ThemeSchema = new Schema({
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
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'resource',
    required: false,
  }],
}, {toJSON: {virtuals: true, getters: true}})

module.exports = ThemeSchema
