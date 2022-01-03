const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const EquipmentSchema = new Schema({
  label: {
    type: String,
  },
  logo: {
    type: String,
  },
})

EquipmentSchema.plugin(mongooseLeanVirtuals)

module.exports = Equipment = mongoose.model('equipment', EquipmentSchema)
