const siret = require('siret')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const lodash=require('lodash')

const Schema = mongoose.Schema

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom de la société est requis'],
    },
    siret: {
      type: String,
      set: v => v ? v.replace(/ /g, '') : v,
      validate: [v => siret.isSIRET(v)||siret.isSIREN(v) , 'Le siret/siren est invalide'],
      required: false,
    },
    picture: {
      type: String,
      required: false,
    },
  },
  schemaOptions,
)

CompanySchema.virtual('users', {
  ref: 'user', // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "company", // is equal to foreignField
});

module.exports = CompanySchema
