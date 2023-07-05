const mongoose = require("mongoose")
const { schemaOptions } = require('../../../utils/schemas')
const { isEmailOk, isPhoneOk } = require('../../../../utils/sms')
const { CONTACT_STATUS, DEPARTEMENTS } = require('../consts')

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Le prénom est obligatoire']
  },
  lastname: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  company_name: String,
  status: {
    type: String,
    enum: Object.keys(CONTACT_STATUS),
    required: [true, 'Le statut est obligatoire']
  },
  email: {
    type: String,
    validate: [isEmailOk, "L'email est invalide"],
    required: [true, "L'email est obligatoire"]
  },
  phone: {
    type: String,
    validate: [isPhoneOk, 'Le numéro de téléphone doit commencer par 0 ou +33'],
    required: [true, 'Le téléphone est obligatoire']
  },
  region: {
    type: String,
    enum: Object.keys(DEPARTEMENTS),
    required: [true, 'Le département est obligatoire']
  },
  message: {
    type: String,
    required: [true, 'Le message est obligatoire']
  },
  urgent: Boolean,
  document: String,
}, schemaOptions
);

module.exports = CompanySchema;
