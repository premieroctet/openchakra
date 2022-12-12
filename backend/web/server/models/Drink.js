const DrinkSchema = require("./fumoir/DrinkSchema");
const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const { PRODUCT_DISC_OPTION } = require("../../utils/fumoir/consts");
const { schemaOptions } = require("../utils/schemas");

let Drink = null;
try {
  const Product = require(`./Product`);
  if (Product) {
    DrinkSchema.plugin(mongooseLeanVirtuals);
    Drink = Product.discriminator("drink", DrinkSchema);
  }
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") {
    throw err;
  }
}

module.exports = Drink;
