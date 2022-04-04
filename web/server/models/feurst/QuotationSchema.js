const extendSchema = require('mongoose-extend-schema')
const BaseSchema=require('./QuotationBookingBaseSchema')

// TODO To complete
const QuotationSchema = extendSchema(BaseSchema, {
}, {toJSON: {virtuals: true, getters: true}})

QuotationSchema.virtual('total_amount').get(function() {
  console.log('Computing')
  const items_amount=lodash.sumBy(this.items, i => i.catalog_price*i.quantity*(1.0-i.discount))
  return items_amount+this.shipping_fee
})

module.exports = QuotationSchema
