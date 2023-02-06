const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const DeviceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  type: {
    type: String,
    required: [true, "Type d'appareil obligatoire"],
  },
  model: {
    type: String,
    required: [true, "Modèle d'appareil obligatoire"],
  },
  model_id: {
    type: String,
    required: [true, "Type de modèle d'appareil obligatoire"],
  },
  deviceid: {
    type: Number,
    required: [true, "Identifiant de l'appareil obligatoire"],
  },
  mac_address: {
    type: String,
    required: [true, "Adresse MAC de l'appareil obligatoire"],
  },
  advertise_key: {
    type: String,
    required: [true, "Clé de l'appareil obligatoire"],
  },
  // last connection date
  last_session_date: {
    type: Date,
    required: false,
  }
}, schemaOptions)


module.exports = DeviceSchema
