const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const moment = require('moment')
const {DAYS} = require('../../utils/dateutils')

const AvailabilitySchema = new Schema({
  // Récurrence si period définie
  period: {
    begin: { type: Date }, // Date début récurrence, heure forcée à 0h00
    end: { type: Date}, // Date fin récurrence, heure forcée à 23h59
    days : [{type : Number }], // set(0...6) => 0 = lundi
  },
  // Si non récurrence, date ponctuelle
  punctual : {
    type : Date
  }, // Si dispo ponctuelle, date ou dates
  // Disponibilite : True ou False
  available : { type : Boolean, required : true},
  // Alfred
  user: { type: Schema.Types.ObjectId, ref: 'users', required : true },
  timelapses: [{ type : Number }], // array containing indexes of available timelapses
}, { toJSON: { virtuals: true, getters: true } });

AvailabilitySchema.virtual('is_punctual').get( function() {
  return ![undefined, null].includes(this.punctual)
})

AvailabilitySchema.virtual('as_text').get( function() {
  if (this.is_punctual) {
    return moment(this.punctual).format('L')
  }
  else {
    return `Du ${moment(this.period.begin).format('L')} au ${moment(this.period.end).format('L')}`
  }
})


module.exports = Availability = mongoose.model('availability', AvailabilitySchema);
