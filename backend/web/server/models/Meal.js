const MealSchema = require("./fumoir/MealSchema");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

let Meal = null;

try {
  const Product = require(`./Product`);
  if (Product) {
    MealSchema.plugin(mongooseLeanVirtuals);
    Meal = Product.discriminator("meal", MealSchema);
  }
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") {
    throw err;
  }
}
module.exports = Meal;
