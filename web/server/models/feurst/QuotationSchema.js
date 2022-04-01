const extendSchema = require('mongoose-extend-schema')
const BaseSchema=require('./QuotationBookingBaseSchema')

// TODO To complete
const QuotationSchema = extendSchema(BaseSchema, {
}, {toJSON: {virtuals: true, getters: true}})

module.exports = QuotationSchema
