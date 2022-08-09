const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const moment = require('moment')
const lodash=require('lodash')
const {getHostUrl} = require('../../../config/config')
const {
  BASEPATH_EDI,
  COMPLETE,
  CONVERTED,
  CREATED,
  EXPIRED,
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
})

QuotationSchema.plugin(mongooseLeanVirtuals)

QuotationSchema.virtual('expiration_date').get(function() {
  if (!this.handled_date) {
    return null
  }
  return moment(this.handled_date).add(QUOTATION_VALIDITY, 'days')
})

QuotationSchema.virtual('status').get(function() {
  if (this.handled_date && !this.linked_order && moment(this.handled_date).add(QUOTATION_VALIDITY, 'days')<moment()) {
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
  if (!lodash.isEmpty(this.address) && !lodash.isEmpty(this.shipping_mode) && !lodash.isEmpty(this.items) && !lodash.isNil(this.shipping_fee)) {
    return COMPLETE
  }
  return CREATED
})

QuotationSchema.virtual('url').get(function() {
  const url=new URL(`${BASEPATH_EDI}/quotations/view/${this.id}`, getHostUrl())
  return url.href
})

QuotationSchema.virtual('filename').get(function() {
  return `Devis ${this.company?.name}-${this.reference || 'pas de référence'}.xlsx`
})

module.exports = QuotationSchema
