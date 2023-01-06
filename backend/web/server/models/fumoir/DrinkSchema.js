const mongoose = require('mongoose')
const {PRODUCT_DISC_OPTION} = require('../../../utils/fumoir/consts')
const {schemaOptions} = require('../../utils/schemas')

const Schema = mongoose.Schema

const DrinkSchema = new Schema(
  {
    tasting: {
      type: String,
      required: false,
    },
  },
  {...schemaOptions, ...PRODUCT_DISC_OPTION},
)

module.exports = DrinkSchema
