const mongoose = require("mongoose")
const bcrypt=require('bcryptjs')
const { schemaOptions } = require('../../../utils/schemas')
const { AVAILABILITY, COACHING, EXPERIENCE, ROLES } = require('../consts')
const IBANValidator = require('iban-validator-js')

const Schema = mongoose.Schema;

const JobUserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  experience: {
    type: String,
    enum: Object.keys(EXPERIENCE),
    //required: [true, "L'expérience est obligatoire"]
  },
  rate: {
    type: Number,
    //required: [true, 'Le taux horaire indicatif est obligatoire'],
  },
  activities: {
    type: String,
    //required: [true, 'Les activités sont obligatoires'],
  },
  skills: {
    type: String,
    //required: [true, 'Les compétences sont obligatoires'],
  },
  customer_location: {
    type: Boolean,
    required: false,
  },
  foreign_location: {
    type: Boolean,
    required: false,
  },
  perimeter: {
    type: Number,
    default: 0,
    min: [0, 'La distance minimum est 0'],
    required: [function() { return this.customer_location}, 'Le périmètre est obligatoire']
  },
  travel_price: {
    type: Number,
    default: 0,
    min: [0, 'Le montant minimum est 0'],
    required: [function() { return this.customer_location}, 'Le tarif de déplacement est obligatoire']
  },
  diploma: {
    type: String,
    required: false,
  },

}, schemaOptions
);

module.exports = JobUserSchema;
