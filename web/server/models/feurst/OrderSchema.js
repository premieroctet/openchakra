const mongoose=require('mongoose')
const lodash=require('lodash')
const {
  COMPLETE,
  CREATED,
  FULFILLED,
  HANDLED,
  PARTIALLY_HANDLED,
  ROLES,
  VALID,
} = require('../../../utils/feurst/consts')
const BaseSchema = require('./QuotationBookingBaseSchema')

const OrderSchema = BaseSchema.clone()

OrderSchema.add({
  reference: {
    type: String,
    required: false, // TODO Required for a valid order
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
  // Was the order handled by Feurst ?
  handle_status: {
    type: String,
    enum: [null, PARTIALLY_HANDLED, HANDLED],
  },
})

OrderSchema.virtual('status').get(function() {
  if (!lodash.isNil(this.handle_status)) {
    return this.handle_status
  }
  if (!lodash.isEmpty(this.address) && !lodash.isEmpty(this.shipping_mode)) {
    return this.user_validated ? VALID : COMPLETE
  }
  if (this.items?.length>0) {
    return FULFILLED
  }
  return CREATED
})


module.exports = OrderSchema
