const mongoose = require('mongoose')
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
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  hint: { // Note de dégustation
    type: String,
  },
  analytical: {
    type: String,
  },
  photo: {
    type: String,
  },
  price: {
    type: Number,
  },
  group: {
    type: String,
  },
  recommandation: [{
    type: Schema.Types.ObjectId,
    ref: 'product',
  }],
  //   family: {
  //     type: String,
  //   },
  //   weight: {
  //     type: Number,
  //     min: 0,
  //     required: true,
  //   },
  tax: {
    type: Schema.Types.ObjectId,
    ref: 'taxes',
  },
  stock: {
    type: Number,
    min: 0,
    set: v => parseInt(v),
    // required: true, TODO make mandatory then import
  },
  
}, {toJSON: {virtuals: true, getters: true}})

ProductSchema.virtual('totalprice').get(function() {
  return this.price * (1 + this.tax)
})

module.exports=ProductSchema
