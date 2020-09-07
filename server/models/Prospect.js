const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProspectSchema = new Schema({
  id: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  keywords: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  creation: {
    type: Date,
    required: true,
  },
  contacted: {
    type: Boolean,
    default: false,
  },
});

Prospect = mongoose.model('prospects', ProspectSchema);

module.exports = Prospect;
