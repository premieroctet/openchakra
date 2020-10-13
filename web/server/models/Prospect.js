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
    default:'aucun',
    required:true,
  },
  name: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  city: {
    type: String,
    required: false,
  },
  zip_code: {
    type: String,
    required: false,
  },
  creation: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  contacted: {
    type: Boolean,
    default: false,
  },
  provider: {
    type: String,
    required: true,
  }
});

Prospect = mongoose.model('prospects', ProspectSchema);

module.exports = Prospect;
