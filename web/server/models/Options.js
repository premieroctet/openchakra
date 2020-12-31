const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO : supprimer ce modèle
const OptionsSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  billing: {
    type: String,
    required: true,
  },
});

module.exports = Options = mongoose.model('options', OptionsSchema);
