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
    required: [true, 'Le nom est obligatoire'],
  },
  description: {
    type: String,
    required: false,
  },
  city: {
    type: String,
  },
  // TI
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
  on_quotation: {
    type: Boolean,
    default: false,
    required: true,
  },
  rate: {
    type: Number,
    set: function(v) {return this.on_quotation ? null : v},
    //required: [function() { return !this.on_quotation}, 'Le taux horaire indicatif est obligatoire'],
    required: false,
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
  pins: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  dummy: {
    type: Number,
    default: 0,
    required: true,
  },
}, schemaOptions
);

/* eslint-disable prefer-arrow-callback */
JobUserSchema.virtual("search_field").get(function() {
  let res=[this.name]
  if (this.skills) {
    res=[...res, this.skills.map(s => s.name)]
  }
  if (this.activities) {
    res=[...res, this.activities.map(a => a.name)]
  }
  return res.join(',')
})

JobUserSchema.virtual("location_str").get(function() {
  const locations=[]
  if (this.customer_location) { locations.push("chez le client")}
  if (this.foreign_location) { locations.push("à distance")}
  return capitalize(locations.join(" et "))
})

JobUserSchema.virtual("activities", {
  ref: "activity", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: 'job' // is equal to foreignField
});

JobUserSchema.virtual("skills", {
  ref: "skill", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: 'job' // is equal to foreignField
});

JobUserSchema.virtual("experiences", {
  ref: "experience", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: 'job' // is equal to foreignField
});

JobUserSchema.virtual("diploma", {
  ref: "diploma", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: 'job' // is equal to foreignField
});

JobUserSchema.virtual("photos", {
  ref: "photo", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: 'job' // is equal to foreignField
});

JobUserSchema.virtual("recommandations", {
  ref: "recommandation", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: 'job' // is equal to foreignField
});

JobUserSchema.virtual("missions", {
  ref: "mission", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "job" // is equal to foreignField
});

JobUserSchema.virtual('pinned').get(function() {
  return false
})

JobUserSchema.virtual('recommandations_count').get(function() {
  return this.recommandations?.length || 0
})


JobUserSchema.virtual('rate_str').get(function() {
  return this.on_quotation ?  "sur devis" : `${this.rate}€/h`
})
/* eslint-enable prefer-arrow-callback */

module.exports = JobUserSchema;
