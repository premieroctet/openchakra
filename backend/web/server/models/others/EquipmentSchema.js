const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EquipmentSchema = new Schema({
  label: {
    type: String,
  },
  logo: {
    type: String,
  },
})

module.exports = EquipmentSchema
