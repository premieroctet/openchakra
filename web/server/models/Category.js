const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const CategorySchema = new Schema({
  particular_label: {
    type: String,
  },
  s_particular_label: {
    type: String,
  },
  professional_label: {
    type: String,
  },
  s_professional_label: {
    type: String,
  },
  particular_picture: {
    type: String,
  },
  professional_picture: {
    type: String,
  },
  description: {
    type: String,
  },
})

CategorySchema.index({label: 'text'})

CategorySchema.plugin(mongooseLeanVirtuals)

module.exports = Category = mongoose.model('category', CategorySchema)
