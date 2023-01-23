const mongoose = require('mongoose')
const {PRODUCT_DISC_OPTION} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const MealSchema = new Schema(
  // TODO: set tasting HERE
  {},
  {...schemaOptions, ...PRODUCT_DISC_OPTION},
)

module.exports = MealSchema
