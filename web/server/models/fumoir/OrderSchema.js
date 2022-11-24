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


const OrderSchema = new Schema({
  billing_number: {
    type: String,
  },
  items: [OrderItemSchema],
  payment: {
    id: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'booking',
  },
  // member or guest have to be fulfilled
  member: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  guest: {
    type: String,
  },
}, schemaOptions)


OrderSchema.plugin(mongooseLeanVirtuals)

module.exports = OrderSchema
