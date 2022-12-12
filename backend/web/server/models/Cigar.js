const CigarSchema = require("./fumoir/CigarSchema");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

let Cigar = null;

try {
  const Product = require(`./Product`);
  if (Product) {
    CigarSchema.plugin(mongooseLeanVirtuals);
    Cigar = Product.discriminator("cigar", CigarSchema);
  }
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") {
    throw err;
  }
}
module.exports = Cigar;
