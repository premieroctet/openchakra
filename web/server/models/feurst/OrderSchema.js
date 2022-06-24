const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const mongoose=require('mongoose')
const lodash=require('lodash')
const {getHostUrl} = require('../../../config/config')
const {
  BASEPATH_EDI,
  COMPLETE,
  CREATED,
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
  if (this.handled_date) {
    return this.handle_status
  }
  if (this.validation_date) {
    return VALID
  }
  if (!lodash.isEmpty(this.address) && !lodash.isEmpty(this.shipping_mode) && !lodash.isNil(this.shipping_fee) && !lodash.isEmpty(this.items)) {
    return COMPLETE
  }
  return CREATED
})

OrderSchema.virtual('url').get(function() {
  const url=new URL(`${BASEPATH_EDI}/orders/view/${this.id}`, getHostUrl())
  return url.href
})

OrderSchema.virtual('filename').get(function() {
  return `Commande ${this.company?.name}-${this.reference}.xlsx`
})


OrderSchema.plugin(mongooseLeanVirtuals)

module.exports = OrderSchema
