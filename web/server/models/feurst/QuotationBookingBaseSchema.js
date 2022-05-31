const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
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
}, {toJSON: {virtuals: true, getters: true}})

BookingItemSchema.virtual('discount').get(function() {
  if (!this.catalog_price || !this.net_price) {
    return 0
  }
  return (this.catalog_price-this.net_price)/this.catalog_price
})

BookingItemSchema.virtual('total_weight').get(function() {
  if (!this.product) {
    return 0
  }
  const total_weight=this.product.weight*this.quantity
  return total_weight
})

BookingItemSchema.virtual('total_amount').get(function() {
  const total_amount=this.net_price*this.quantity
  return total_amount
})

BookingItemSchema.plugin(mongooseLeanVirtuals)

const QuotationBookingBaseSchema=new Schema({
  // Order destinee
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true,
  },
  // Company creator (null if created by Feurst)
  created_by_company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
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
  validation_date: {
    type: Date,
    required: false,
  },
  handled_date: {
    type: Date,
    required: false,
  },
}, {toJSON: {virtuals: true, getters: true}})

QuotationBookingBaseSchema.virtual('total_amount').get(function() {
  if (lodash.isEmpty(this.items)) {
    return 0
  }
  const items_amount=lodash.sumBy(this.items, i => i.net_price*i.quantity)
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

QuotationBookingBaseSchema.virtual('sales_representative').get(function() {
  return this.company?.sales_representative
})

QuotationBookingBaseSchema.plugin(mongooseLeanVirtuals)

module.exports=QuotationBookingBaseSchema
