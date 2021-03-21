const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {normalize} = require('../../utils/text');

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
    ref: 'tag',
  }],
});

CategorySchema.index({label: 'text'});

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
