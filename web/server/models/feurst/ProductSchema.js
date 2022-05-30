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
  family: {
    type: String,
  },
  weight: {
    type: Number,
    min: 0,
    required: true,
  },
  stock: {
    type: Number,
    min: 0,
    // required: true, TODO make mandatory then import
  },
  components: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'product',
    }],
    'default': [],
  },
})

module.exports=ProductSchema
