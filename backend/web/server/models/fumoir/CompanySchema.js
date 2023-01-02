const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')
const {hideIllegal} = require('../../../utils/text')

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
    description: {
      type: String,
      set: text => hideIllegal(text),
    },
  },
  schemaOptions,
)

module.exports = CompanySchema
