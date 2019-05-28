const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
    label:{
        type: String
    },
    logo: {
        type: String
    },
    name_logo: String
});

module.exports = EquipmentUser = mongoose.model('equipment',EquipmentSchema);
