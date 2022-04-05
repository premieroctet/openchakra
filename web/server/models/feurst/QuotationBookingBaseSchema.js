const AddressSchema = require('../AddressSchema')
const {Schema}=require('mongoose')

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
})

BookingItemSchema.virtual('target_price').get(function() {
  if (!this.catalog_price) {
    return 0
  }
  return this.catalog_price*(1.0-this.discount)
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
  address: AddressSchema,
  creation_date: {
    type: Date,
    default: Date.now,
  },
}, {toJSON: {virtuals: true, getters: true}})

QuotationBookingBaseSchema.virtual('total_amount').get(function() {
  const items_amount=lodash.sumBy(this.items, i => i.catalog_price*i.quantity*(1.0-i.discount))
  return items_amount+this.shipping_fee
})

module.exports=QuotationBookingBaseSchema
