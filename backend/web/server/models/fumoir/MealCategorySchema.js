const { CATEGORY_DISC_OPTION } = require("../../../utils/fumoir/consts")
const mongoose = require("mongoose")
const { schemaOptions } = require("../../utils/schemas")

const Schema = mongoose.Schema

const MealCategorySchema = new Schema(
  {},
  { ...schemaOptions,
     ...CATEGORY_DISC_OPTION }
)

module.exports = MealCategorySchema
