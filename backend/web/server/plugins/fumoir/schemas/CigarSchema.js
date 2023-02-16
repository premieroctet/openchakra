const mongoose = require('mongoose')
const {PRODUCT_DISC_OPTION} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const CigarSchema = new Schema(
  {},
  {...schemaOptions, ...PRODUCT_DISC_OPTION},
)

CigarSchema.virtual('reviews', {
  ref: 'review', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'cigar', // is equal to foreignField
})

module.exports = CigarSchema
