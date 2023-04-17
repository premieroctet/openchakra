const {getDataModel}=require('../../config/config')

let Cigar = null

try {
  const Product = require(`./Product`)
  if (Product) {
    const CigarSchema=require(`../plugins/${getDataModel()}/schemas/CigarSchema`)
    CigarSchema.plugin(require('mongoose-lean-virtuals'))
    Cigar = Product.discriminator('cigar', CigarSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = Cigar
