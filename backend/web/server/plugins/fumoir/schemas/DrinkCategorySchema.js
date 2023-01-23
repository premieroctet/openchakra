const mongoose = require('mongoose')
const {CATEGORY_DISC_OPTION} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const DrinkCategorySchema = new Schema(
  {},
  {...schemaOptions, ...CATEGORY_DISC_OPTION},
)

module.exports = DrinkCategorySchema
