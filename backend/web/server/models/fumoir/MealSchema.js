const { PRODUCT_DISC_OPTION } = require("../../../utils/fumoir/consts");
const mongoose = require("mongoose");
const { schemaOptions } = require("../../utils/schemas");

const Schema = mongoose.Schema;

const MealSchema = new Schema({}, { ...schemaOptions, ...PRODUCT_DISC_OPTION });

module.exports = MealSchema;
