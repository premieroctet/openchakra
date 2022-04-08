const mongoose = require('mongoose')
const {roundCurrency} = require('../../../utils/converters')

const Schema = mongoose.Schema

const ShipRateSchema = new Schema({
  zipcode: {
    type: Number,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  min_weight: {
    type: Number,
    required: true,
  },
  max_weight: {
    type: Number,
    required: true,
  },
  express: {
    type: Boolean,
    required: true,
  },
  // Forfait quel que soit le poids
  fixed_price: {
    type: Number,
    get: v => roundCurrency(v),
    required: true,
  },
  // Supplément par kg
  per_kg_price: {
    type: Number,
    get: v => roundCurrency(v),
    default: true,
  },
}, {toJSON: {virtuals: true, getters: true}})

module.exports = ShipRateSchema
