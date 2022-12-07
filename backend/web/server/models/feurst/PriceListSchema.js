const { schemaOptions } = require('../../utils/schemas');
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PriceListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  // Catalog price
  price: {
    type: Number,
    min: 0,
    required: true,
  },
}, schemaOptions)

module.exports = PriceListSchema
