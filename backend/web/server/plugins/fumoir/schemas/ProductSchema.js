const mongoose = require('mongoose')
const {PRODUCT_DISC_OPTION} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const ProductSchema = new Schema(
  {
    reference: {
      type: String,
      required: [true, 'Le code produit est obligatoire'],
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    // TODO set tasting in DrinkSchema ONLY
    tasting: {
      type: String,
      required: false,
    },
    features: {
      // Caractéristiques
      type: String,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: 'company',
      required: [true, "L'entité analytique est obligatoire"],
    },
    picture: {
      type: String,
      required: [true, "L'illustration est obligatoire"],
    },
    recommandation: [
      {
        // Other recommanded products
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: [true, 'La catégorie est obligatoire'],
    },
    price: {
      // Price including tax
      type: Number,
      min: 0,
      required: [true, 'Le prix est obligatoire'],
    },
    vat_rate: {
      // VAT rate (0.0 => 1.0)
      type: Number,
      min: [0, 'Le taux de TVA doit être entre 0 et 1'],
      max: [1, 'Le taux de TVA doit être entre 0 et 1'],
      default: 0,
      required: [true, 'Le taux de tva est obligatoire'],

    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
      set: v => parseInt(v),
      // required: false, TODO make mandatory then import
    },
  },
  {...schemaOptions, ...PRODUCT_DISC_OPTION},
)

ProductSchema.virtual('net_price').get(function() {
  return this.price * (1 - this.vat_rate)
})


module.exports = ProductSchema
