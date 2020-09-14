const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalculatingSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
});

module.exports = Calculating = mongoose.model('calculating', CalculatingSchema);
