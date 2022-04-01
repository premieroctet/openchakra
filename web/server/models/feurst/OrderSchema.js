const BaseSchema = require('./QuotationBookingBaseSchema')
const extendSchema = require('mongoose-extend-schema')
const {BOOK_STATUS, ROLES} = require('../../../utils/consts')


const OrderSchema = extendSchema(BaseSchema, {
  reference: {
    type: String,
    required: false, // Required but let user create without one
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
    required: true,
  },
}, {toJSON: {virtuals: true, getters: true}})

module.exports = OrderSchema
