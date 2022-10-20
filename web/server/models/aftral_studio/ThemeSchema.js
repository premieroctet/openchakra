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
  description: {
    type: String,
    required: false,
  },
  ordered: {
    type: Boolean,
    default: true,
    required: true,
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


ThemeSchema.virtual('hidden').get(function() {
  return (!this.name && !this.code && !this.picture)
})

module.exports = ThemeSchema
