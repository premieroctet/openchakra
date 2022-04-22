const mongoose=require('mongoose')
const lodash=require('lodash')
const {ORDER_VALID, ORDER_FULFILLED, ORDER_CREATED, ROLES} = require('../../../utils/consts')
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
  source_quotation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quotation',
    required: false,
  },
})

OrderSchema.virtual('status').get(function() {
  if (!lodash.isEmpty(this.address) && !lodash.isEmpty(this.shipping_mode)) {
    return ORDER_VALID
  }
  if (this.items?.length>0) {
    return ORDER_FULFILLED
  }
  return ORDER_CREATED
})


module.exports = OrderSchema
