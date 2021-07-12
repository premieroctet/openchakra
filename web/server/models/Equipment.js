const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO: supprimer name_logo, logo2, nae_logo2
const EquipmentSchema = new Schema({
  label: {
    type: String,
  },
  logo: {
    type: String,
  },
  name_logo: String,
  logo2: {
    type: String,
  },
  name_logo2: String,
})

module.exports = EquipmentSchema
