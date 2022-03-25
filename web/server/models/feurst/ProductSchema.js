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
  description_2: {
    type: String,
  },
  group: {
    type: String,
  },
  production_line: {
    type: String,
  },
  family: {
    type: String,
  },
  weight: {
    type: Number,
    min: 0,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    // required: true, TODO make mandatory then import
  },
})

module.exports=ProductSchema
