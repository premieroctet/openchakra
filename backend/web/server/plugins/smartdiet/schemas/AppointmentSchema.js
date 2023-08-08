const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const {idEqual}=require('../../../utils/database')

const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
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
  note: {
    type: String,
    required: false,
  },
  // For each new appointment, copy the ones from the previous
  objectives: [{
    type: Schema.Types.ObjectId,
    ref: 'quizzQuestion',
    required: true,
  }],
  user_objectives: [{
    type: Schema.Types.ObjectId,
    ref: 'userQuizzQuestion',
    required: true,
  }],
}, schemaOptions)

AppointmentSchema.virtual('order').get(function() {
  return this.coaching.appointments?.findIndex(app => idEqual(app._id, this._id))+1
})
module.exports = AppointmentSchema
