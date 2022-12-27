const DrinkCategorySchema = require("./fumoir/DrinkCategorySchema");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

let DrinkCategory = null;

try {
  const Category = require(`./Category`);
  if (Category) {
    DrinkCategorySchema.plugin(mongooseLeanVirtuals);
    DrinkCategory = Category.discriminator("drinkCategory", DrinkCategorySchema)
  }
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") {
    throw err;
  }
}
module.exports = DrinkCategory
