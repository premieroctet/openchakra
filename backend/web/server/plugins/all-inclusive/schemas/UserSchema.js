const {
  AVAILABILITY,
  COACHING,
  COACH_OTHER,
  DEFAULT_ROLE,
  ROLES
} = require('../consts')
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
  name: {
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
    default: 'invalid',
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
    default: DEFAULT_ROLE,
    required: [true, 'Le rôle est obligatoire'],
  },
  phone: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    required: [true, 'La date de naissance est obligatoire'],
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
    required: false,
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
    required: [true, "Le mode d'accompagnement est obligatoire"],
  },
  coaching_company: {
    type: String,
    required: [function() { return this.coaching==COACH_OTHER}, 'La structure accompagnante est obligatoire'],
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
    default: true,
  },
  // Agreed by AllE
  qualified: {
    type: Boolean,
    default: false,
  },
  nationality: {
    type: String,
  },
  id_card: {
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
}, schemaOptions
);

UserSchema.virtual("full_name").get(function() {
  return `${this.firstname} ${this.name}`;
});

// For password checking only
UserSchema.virtual("password2")

UserSchema.virtual('profile_progress').get(function() {
  const attributes='firstname lastname email phone birthday nationality picture id_card iban'.split(' ')
  const companyAttributes='name status siret status_report insurance_type insurance_report picture'
    .split(' ').map(att => `company.${att}`)
  let filled=attributes.map(att => !!lodash.get(this, att))
  if (this.company) {
    filled=[...filled, ...companyAttributes.map(att => !!lodash.get(this, att))]
  }
  return (filled.filter(v => !!v)*1.0/filled.length)*100
});

UserSchema.virtual("comments", {
  ref: "comment", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

UserSchema.virtual("recommandations", {
  ref: "recommandation", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

UserSchema.virtual("quotations", {
  ref: "quotation", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

module.exports = UserSchema;
