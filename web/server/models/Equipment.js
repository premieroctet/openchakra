const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

module.exports = EquipmentUser = mongoose.model('equipment', EquipmentSchema);
