const mongoose = require('mongoose')
const {PRODUCT_DISC_OPTION} = require('../consts')
const lodash=require('lodash')
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

CigarSchema.virtual('average_taste_note').get(function() {
  if (!this.reviews) {
    return null
  }
  const taste_notes=this.reviews.filter(r => !lodash.isNil(r.taste_note)).map(r => r.taste_note)
  if (lodash.isEmpty(taste_notes)) {
    return null
  }
  return lodash.mean(taste_notes)
})

module.exports = CigarSchema
