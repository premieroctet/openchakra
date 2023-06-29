const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const ConsultationSchema = new Schema({
  coaching: {
    type: Schema.Types.ObjectId,
    ref: 'coaching',
    required: [true, 'Le coaching est obligatoire'],
  },
  start_date: {
    type: Date,
    required: [true, 'La date de début est obligatoire'],
  },
  end_date: {
    type: Date,
    validate: [v => (!v || moment(v).isAfter(this.start_date)), 'La fin doit être postérieure au début'],
    required: false,
  },
  synthesis: {
    type: String,
    required: false,
  },
  objectives: {
    type: String,
    required: false,
  },
  note: {
    type: String,
    required: false,
  },
}, schemaOptions)

module.exports = ConsultationSchema
