const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
  reference: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: [{ // Caractéristiques
    type: String,
  }],
  hint: { // Note de dégustation
    type: String,
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'company',
  },
  picture: {
    type: String,
  },
  recommandation: [{
    type: Schema.Types.ObjectId,
    ref: 'product',
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
  priceWT: { // Price without tax
    type: Number,
    min: 0,
  },
  vat: {
    type: Number,
    min: 0,
    max: 1,
  },
  stock: {
    type: Number,
    min: 0,
    set: v => parseInt(v),
    // required: true, TODO make mandatory then import
  },
  
}, schemaOptions)

ProductSchema.virtual('totalprice').get(function() {
  return this.priceExcludingTax * (1 + this.tax)
})

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: 'content',
  foreignField: '_id',
})

module.exports=ProductSchema
