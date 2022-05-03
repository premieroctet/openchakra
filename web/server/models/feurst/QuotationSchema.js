const mongoose=require('mongoose')
const lodash=require('lodash')
const {
  QUOTATION_COMPLETE,
  QUOTATION_CREATED,
  QUOTATION_FULFILLED,
  QUOTATION_VALID,
  ROLES,
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
  source_quotation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quotation',
    required: false,
  },
})

OrderSchema.virtual('status').get(function() {
  if (!lodash.isEmpty(this.address) && !lodash.isEmpty(this.shipping_mode)) {
    return this.user_validated ? QUOTATION_VALID : QUOTATION_COMPLETE
  }
  if (this.items?.length>0) {
    return QUOTATION_FULFILLED
  }
  return QUOTATION_CREATED
})


module.exports = OrderSchema
