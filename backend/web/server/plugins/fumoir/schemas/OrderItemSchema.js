const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemaOptions} = require('../../../utils/schemas')

const OrderItemSchema = new Schema(
  {
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
    price: {
      // Price including tax for one item
      type: Number,
      min: 0,
    },
    vat_rate: {
      // VAT rate (0.0 => 1.0)
      type: Number,
      min: 0,
      max: 1,
    },
  },
  schemaOptions,
)

OrderItemSchema.virtual('vat_amount').get(function() {
  return this.price * this.vat_rate
})

OrderItemSchema.virtual('net_price').get(function() {
  return this.price * (1 - this.vat_rate)
})

OrderItemSchema.virtual('total_vat_amount').get(function() {
  return this.price * this.vat_rate * this.quantity
})

OrderItemSchema.virtual('total_net_price').get(function() {
  return this.price * (1 - this.vat_rate) * this.quantity
})

OrderItemSchema.virtual('total_price').get(function() {
  return this.price * this.quantity
})

module.exports = OrderItemSchema
