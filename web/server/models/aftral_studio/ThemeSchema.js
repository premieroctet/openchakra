const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ThemeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'resource',
    required: false,
  }],
}, {toJSON: {virtuals: true, getters: true}})

module.exports = ThemeSchema
