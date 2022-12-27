const CigarCategorySchema = require("./fumoir/CigarCategorySchema");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

let CigarCategory = null;

try {
  const Category = require(`./Category`);
  if (Category) {
    CigarCategorySchema.plugin(mongooseLeanVirtuals);
    CigarCategory = Category.discriminator("cigarCategory", CigarCategorySchema)
  }
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") {
    throw err;
  }
}
module.exports = CigarCategory
