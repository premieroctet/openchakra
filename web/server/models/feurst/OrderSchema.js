const BaseSchema = require('./QuotationBookingBaseSchema')
const extendSchema = require('mongoose-extend-schema')
const {BOOK_STATUS, ROLES} = require('../../../utils/consts')
const lodash=require('lodash')

const OrderSchema = extendSchema(BaseSchema, {
  reference: {
    type: String,
    required: false, // TODO Required for a valid order
  },
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
    default: 0,
    required: false, // TODO Required for a valid order
  },
}, {toJSON: {virtuals: true, getters: true}})

OrderSchema.virtual('total_amount').get(function() {
  console.log('Computing')
  const items_amount=lodash.sumBy(this.items, i => i.catalog_price*i.quantity*(1.0-i.discount))
  return items_amount+this.shipping_fee
})

module.exports = OrderSchema
