const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const {COMPANY_ACTIVITY, COMPANY_SIZE}=require('../consts')

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
    activity: {
      type: String,
      enum: Object.keys(COMPANY_ACTIVITY),
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    administrator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  schemaOptions,
)

module.exports = CompanySchema
