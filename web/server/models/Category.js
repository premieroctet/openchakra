const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
})

CategorySchema.index({label: 'text'})

module.exports = CategorySchema
