const {Schema}=require('mongoose')
const lodash=require('lodash')
const {SHIPPING_MODES} = require('../../../utils/feurst/consts')
const {roundCurrency} = require('../../../utils/converters')
const AddressSchema = require('../AddressSchema')

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
    default: 0,
  },
  // Catalog price
  catalog_price: {
    type: Number,
    min: 0,
    required: true,
  },
}, {toJSON: {virtuals: true, getters: true}})

BookingItemSchema.virtual('target_price').get(function() {
  if (!this.catalog_price) {
    return 0
  }
  return this.catalog_price*this.quantity*(1.0-this.discount)
})

BookingItemSchema.virtual('total_weight').get(function() {
  if (!this.product) {
    return 0
  }
  const total_weight=this.product.weight*this.quantity
  return total_weight
})


const QuotationBookingBaseSchema=new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: false,
  },
  items: [BookingItemSchema],
  shipping_fee: {
    type: Number,
    default: 0,
    get: v => roundCurrency(v),
  },
  shipping_mode: {
    type: String,
    enum: [null, ...Object.keys(SHIPPING_MODES)],
    required: false,
  },
  address: AddressSchema,
  creation_date: {
    type: Date,
    default: Date.now,
  },
  user_validated: {
    type: Boolean,
    default: false,
  },
}, {toJSON: {virtuals: true, getters: true}})

QuotationBookingBaseSchema.virtual('total_amount').get(function() {
  const items_amount=lodash.sumBy(this.items||[], i => i.catalog_price*i.quantity*(1.0-i.discount))
  const total_amount=roundCurrency(items_amount+this.shipping_fee)
  return total_amount
})

QuotationBookingBaseSchema.virtual('total_weight').get(function() {
  if (lodash.isEmpty(this.items)) {
    return 0
  }
  const total_weight=lodash.sumBy(this.items, i => i.total_weight)
  return parseInt(total_weight)
})

QuotationBookingBaseSchema.virtual('total_quantity').get(function() {
  if (lodash.isEmpty(this.items)) {
    return 0
  }
  const total_quantity=lodash.sumBy(this.items, i => i.quantity)
  return total_quantity
})

module.exports=QuotationBookingBaseSchema
