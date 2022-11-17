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
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  analytical: {
    type: Schema.Types.ObjectId,
    ref: 'company',
  },
  photo: {
    type: String,
  },
  group: {
    type: String,
  },
  recommandation: [{
    type: Schema.Types.ObjectId,
    ref: 'product',
  }],
  category1: {
    type: String,
  },
  category2: {
    type: String,
  },
  category3: {
    type: String,
  },
  priceExcludingTax: {
    type: Number,
  },
  tax: {
    type: Number,
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

module.exports=ProductSchema
