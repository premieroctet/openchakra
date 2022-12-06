const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const Schema = mongoose.Schema
const {schemaOptions} = require('../../utils/schemas')

const OrderItemSchema = new Schema({
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
  priceWT: {
    type: Number,
    min: 0,
    required: true,
  },
  vat: {
    type: Number,
    min: 0,
    max: 1,
  },
}, schemaOptions)

OrderItemSchema.plugin(mongooseLeanVirtuals)

module.exports = OrderItemSchema
