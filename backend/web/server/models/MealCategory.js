const MealCategorySchema = require("./fumoir/MealCategorySchema");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

let MealCategory = null;

try {
  const Category = require(`./Category`);
  if (Category) {
    MealCategorySchema.plugin(mongooseLeanVirtuals);
    MealCategory = Category.discriminator("mealCategory", MealCategorySchema)
  }
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") {
    throw err;
  }
}
module.exports = MealCategory
