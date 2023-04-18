const siret = require('siret')
const {
  AVAILABILITY,
  COACHING,
  COACH_OTHER,
  COMPANY_ACTIVITY,
  COMPANY_SIZE,
  COMPANY_STATUS,
  DEFAULT_ROLE,
  ROLES,
  ROLE_COMPANY_BUYER,
  ROLE_TI
} = require('../consts')
const NATIONALITIES=require('../nationalities')
const mongoose = require("mongoose")
const bcrypt=require('bcryptjs')
const { schemaOptions } = require('../../../utils/schemas')
const lodash=require('lodash')
const IBANValidator = require('iban-validator-js')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Le prénom est obligatoire'],
  },
  lastname: {
    type: String,
    required: [true, 'Le nom de famille est obligatoire'],
  },
  email: {
    type: String,
    required: true,
    set: v => v.toLowerCase().trim(),
    required: [true, "L'email est obligatoire"],
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    set: pass => bcrypt.hashSync(pass, 10),
  },
  cguAccepted: {
    type: Boolean,
    validate: [value => !!value, 'Vous devez accepter les CGU'],
    required: [true, 'Vous devez accepter les CGU'],
  },
  role: {
    type: String,
    enum: Object.keys(ROLES),
    required: [true, 'Le rôle est obligatoire'],
  },
  phone: {
    type: String,
    required: [function() { return this.role==ROLE_COMPANY_BUYER}, 'Le téléphone est obligatoire'],
  },
  birthday: {
    type: Date,
    required: [function() { return this.role==ROLE_TI}, 'La date de naissance est obligatoire'],
  },
  picture: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  coaching: {
    type: String,
    enum: Object.keys(COACHING),
    required: [function() { return this.role==ROLE_TI}, "Le mode d'accompagnement est obligatoire"],
  },
  coaching_company: {
    type: String,
    required: [function() { return this.role==ROLE_TI && this.coaching==COACH_OTHER}, 'La structure accompagnante est obligatoire'],
  },
  coaching_end_date: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  hidden: {
    type: Boolean,
    default: function() { return this.role==ROLE_TI},
  },
  // Agreed by AllE
  qualified: {
    type: Boolean,
    default: false,
  },
  nationality: {
    type: String,
    enum: Object.keys(NATIONALITIES),
    required: false,
  },
  identity_proof_1: {
    type: String,
  },
  identity_proof_2: {
    type: String,
  },
  iban: {
    type: String,
    validate: [v => IBANValidator.isValid(v), "L'IBAN est invalide"],
  },
  availability: {
    type: String,
    enum: Object.keys(AVAILABILITY),
    required: false,
  },
  address: {
    type: String,
  },
  company_name: {
    type: String,
    required: [function() { return this.role==ROLE_COMPANY_BUYER}, "Le nom de l'entreprise' est obligatoire"],
  },
  company_status: {
    type: String,
    enum: Object.keys(COMPANY_STATUS),
    required: false,
  },
  siret: {
    type: String,
    validate: [v => siret.isSIRET(v)||siret.isSIREN(v), 'Le SIRET ou SIREN est invalide'],
    required: false,
  },
  // In french: "Avis de situation"
  status_report: {
    type: String,
  },
  vat_subject: {
    type: Boolean,
  },
  // Insurance type : décennale, tiers
  insurance_type: {
    type: String,
  },
  // Insurance document
  insurance_report: {
    type: String,
  },
  company_activity: {
    type: String,
    enum: Object.keys(COMPANY_ACTIVITY),
    required: false,
  },
  company_size: {
    type: String,
    enum: Object.keys(COMPANY_SIZE),
    required: false,
  },
  company_function: {
    type: String,
    required: false,
  },
  company_picture: {
    type: String,
  },
  representative_firstname: {
    type: String,
  },
  representative_lastname: {
    type: String,
  },
}, schemaOptions
);

UserSchema.virtual("full_name").get(function() {
  return `${this.firstname} ${this.lastname}`;
});

// For password checking only
UserSchema.virtual("password2")

UserSchema.virtual('profile_progress').get(function() {
  const attributes='firstname lastname email phone birthday nationality picture identity_proof_1 iban'.split(' ')
  const companyAttributes='company_name company_status siret status_report insurance_type insurance_report company_picture'
    .split(' ')
  let filled=attributes.map(att => !!lodash.get(this, att))
  if (this.role==ROLE_COMPANY_BUYER) {
    filled=[...filled, ...companyAttributes.map(att => !!lodash.get(this, att))]
  }
  return (filled.filter(v => !!v).length*1.0/filled.length)*100
});

UserSchema.virtual("jobs", {
  ref: "jobUser", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

UserSchema.virtual("comments", {
  ref: "comment", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

UserSchema.virtual("quotations", {
  ref: "quotation", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

UserSchema.virtual("requests", {
  ref: "request", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

UserSchema.virtual("qualified_str").get(function() {
  return this.qualified ? 'qualifié' : 'à qualifier'
});

UserSchema.virtual("visible_str").get(function() {
  return this.hidden ? 'masqué' : 'visible'
});

module.exports = UserSchema;
