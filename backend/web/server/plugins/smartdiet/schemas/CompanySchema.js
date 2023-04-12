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
    offer: {
      type: Schema.Types.ObjectId,
      ref: 'offer',
      required: true,
    },
  },
  schemaOptions,
)

CompanySchema.virtual("administrators", {
  ref: "user", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "company", // is equal to foreignField
  justOne: true,
});

module.exports = CompanySchema
