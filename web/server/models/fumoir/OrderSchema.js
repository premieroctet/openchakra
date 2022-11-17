const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const Schema = mongoose.Schema
const {schemaOptions} = require('../../utils/schemas')

const BookingItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  quantity: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    min: 1,
    required: true,
  },
  // Catalog price
  catalog_price: {
    type: Number,
    min: 0,
    required: true,
  },
  // Price after discount (or from price list)
  net_price: {
    type: Number,
    min: 0,
    required: true,
  },
}, schemaOptions)


const OrderSchema = new Schema({
  billing_number: {
    type: String,
  },
  items: [BookingItemSchema],
  payment: {
    type: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  booking_ref: {
    type: Schema.Types.ObjectId,
    ref: 'booking',
  },
  order_creator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, schemaOptions)


OrderSchema.plugin(mongooseLeanVirtuals)

module.exports = OrderSchema
