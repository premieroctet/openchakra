const lodash=require('lodash')
const mongoose = require('mongoose')
const {BOOK_STATUS, ROLES} = require('../../../utils/consts')
const Schema = mongoose.Schema

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
  discount: {
    type: Number,
    min: 0,
    max: 1.0,
    required: true,
  },
  // Catalog price
  catalog_price: {
    type: Number,
    min: 0,
    required: true,
  },
})

BookingItemSchema.virtual('target_price').get(function() {
  if (!this.catalog_price) {
    return 0
  }
  return this.catalog_price*(1.0-this.discount)
})


const BookingSchema = new Schema({
  reference: {
    type: String,
    required: true,
  },
  address: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    country: {
      type: String,
    },
    gps: {
      lat: Number,
      lng: Number,
    },
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  items: [BookingItemSchema],
  status: {
    type: String,
    enum: Object.values(BOOK_STATUS),
  },
  // User role when booking
  user_role: {
    type: String,
    enum: [null, ...Object.keys(ROLES)],
  },
  billing_number: {
    type: String,
  },
  receipt_number: {
    type: String,
  },
  shipping_fee: {
    type: Number,
    min: 0,
    required: true,
  },
}, {toJSON: {virtuals: true, getters: true}})

BookingSchema.virtual('total_amount').get(function() {
  const items_amount=lodash.sumBy(this.items, 'target_price')
  return items_amount+this.shipping_fee
})

module.exports = BookingSchema
