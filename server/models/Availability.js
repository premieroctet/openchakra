const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moment=require('moment')
const {DAYS}=require('../../utils/dateutils')

const AvailabilitySchema = new Schema({
    // Récurrence si period définie
    period: {
        begin: { type: Date }, // Date début récurrence, heure forcée à 0h00
        end: { type: Date} // Date fin récurrence, heure forcée à 23h59
    },
    // Si non récurrence, date(s) ponctuelle(s)
    punctuals : [{type : Date}], // Si dispo ponctuelle, date ou dates
    // Disponibilite : True ou False
    available : { type : Boolean, required : true},
    // Alfred
    user: { type: Schema.Types.ObjectId, ref: 'users', required : true },
    days : [{type : Number }], // set(0...6) => 0 = lundi
    timelapses: [{ type : Number }], // set(0..23) => périodes horaires : 0 => 0h→1h, 1=> 1h→2h, etc
  }, { toJSON: { virtuals: true, getters: true } });

AvailabilitySchema.virtual('is_punctual').get( function() {
  return this.punctuals && this.punctuals.length>0
})


module.exports = Availability = mongoose.model('availability',AvailabilitySchema);
