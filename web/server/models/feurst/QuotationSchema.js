const mongoose = require('mongoose')
const moment = require('moment')
const lodash=require('lodash')
const {
  COMPLETE,
  CREATED,
  EXPIRED,
  FULFILLED,
  HANDLED,
  QUOTATION_VALIDITY,
  ROLES,
  VALID,
} = require('../../../utils/feurst/consts')
const BaseSchema = require('./QuotationBookingBaseSchema')

const QuotationSchema = BaseSchema.clone()

QuotationSchema.add({
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
  linked_order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
    required: false,
  },
  validation_date: {
    type: Date,
    required: false,
  },
  handled_date: {
    type: Date,
    required: false,
  },
})

QuotationSchema.virtual('status').get(function() {
  if (this.handled_date && moment(this.handled_date).add(QUOTATION_VALIDITY, 'days')<moment()) {
    return EXPIRED
  }
  if (this.linked_order) {
    return CONVERTED
  }
  if (this.handled_date) {
    return HANDLED
  }
  if (this.validation_date) {
    return VALID
  }
  if (!lodash.isEmpty(this.address) && !lodash.isEmpty(this.shipping_mode)) {
    return COMPLETE
  }
  return CREATED
})


module.exports = QuotationSchema
