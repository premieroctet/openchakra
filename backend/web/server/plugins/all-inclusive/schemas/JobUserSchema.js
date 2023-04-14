const { capitalize } = require('../../../../utils/text')
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

JobUserSchema.virtual("location_str").get(function() {
  const locations=[]
  if (this.customer_location) { locations.push("chez le client")}
  if (this.foreign_location) { locations.push("à distance")}
  return capitalize(locations.join(" et "))
})

JobUserSchema.virtual("activities", {
  ref: "activity", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "job" // is equal to foreignField
});

JobUserSchema.virtual("skills", {
  ref: "skill", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "job" // is equal to foreignField
});

module.exports = JobUserSchema;
