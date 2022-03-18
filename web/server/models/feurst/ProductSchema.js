const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  reference: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    min: 0,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
})

module.exports=ProductSchema
