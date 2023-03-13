const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom de la société est requis'],
    },
    siret: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  schemaOptions,
)

module.exports = CompanySchema
