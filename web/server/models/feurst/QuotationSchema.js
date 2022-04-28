const lodash=require('lodash')
const {
  QUOTATION_COMPLETE,
  QUOTATION_CREATED,
  QUOTATION_FULFILLED,
  QUOTATION_VALID,
} = require('../../../utils/feurst/consts')
const BaseSchema=require('./QuotationBookingBaseSchema')

// TODO To complete
const QuotationSchema = BaseSchema.clone()

/*
QuotationSchema.add({
})
*/

QuotationSchema.virtual('status').get(function() {
  if (!lodash.isEmpty(this.address) && !lodash.isEmpty(this.shipping_mode)) {
    return this.user_validated ? QUOTATION_VALID : QUOTATION_COMPLETE
  }
  if (this.items?.length>0) {
    return QUOTATION_FULFILLED
  }
  return QUOTATION_CREATED
})

module.exports = QuotationSchema
