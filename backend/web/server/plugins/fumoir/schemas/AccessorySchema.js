const mongoose = require('mongoose')
const {PRODUCT_DISC_OPTION} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const AccessorySchema = new Schema(
  {},
  {...schemaOptions, ...PRODUCT_DISC_OPTION},
)

module.exports = AccessorySchema
