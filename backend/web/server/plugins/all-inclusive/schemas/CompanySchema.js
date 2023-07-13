const mongoose = require("mongoose")
const { schemaOptions } = require('../../../utils/schemas')
const siret = require('siret')
const { COMPANY_STATUS } = require('../consts')
const AddressSchema = require('../../../models/AddressSchema')

  const Schema = mongoose.Schema;

  const CompanySchema = new Schema({
    name: {
      type: String,
      required: false,
    },
    address: {
      type: AddressSchema,
      required: false,
    },
    status: {
      type: String,
      enum: Object.keys(COMPANY_STATUS),
      required: [true, 'Le statut est obligatoire'],
    },
    siret: {
      type: String,
      set: v => v?.replace(/ /g, ''),
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
    picture: {
      type: String,
      required: false,
    },
    // Insurance type : décennale, tiers
    insurance_type: {
      type: String,
    },
    // Insurance document
    insurance_report: {
      type: String,
    },
  }, schemaOptions
  );

module.exports = CompanySchema;
