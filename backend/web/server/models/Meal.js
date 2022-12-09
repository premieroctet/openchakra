const mongoose = require("mongoose");
const { PRODUCT_DISC_OPTION } = require("../../utils/fumoir/consts");
const { schemaOptions } = require("../utils/schemas");

let Meal = null;

try {
  const Product = require(`./Product`);
  if (Product) {
    Meal = Product.discriminator(
      "meal",
      new mongoose.Schema({}, { ...schemaOptions, ...PRODUCT_DISC_OPTION })
    );
    // TODO: create DrinkSchema Drink?.plugin(mongooseLeanVirtuals)
  }
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") {
    throw err;
  }
}
module.exports = Meal;
