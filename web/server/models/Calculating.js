const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO : supprimer ce modèle
const CalculatingSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
})

module.exports = CalculatingSchema
