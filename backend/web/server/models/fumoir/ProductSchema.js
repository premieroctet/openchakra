const mongoose = require('mongoose')
const {PRODUCT_DISC_OPTION} = require('../../../utils/fumoir/consts')
const {schemaOptions} = require('../../utils/schemas')

const Schema = mongoose.Schema

const ProductSchema = new Schema(
  {
    reference: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
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
    },
    picture: {
      type: String,
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
    },
    price: {
      // Price including tax
      type: Number,
      min: 0,
    },
    vat_rate: {
      // VAT rate (0.0 => 1.0)
      type: Number,
      min: 0,
      max: 1,
      default: 0,
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

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
})

module.exports = ProductSchema
