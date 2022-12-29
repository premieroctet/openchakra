const {PAID_STR, TO_PAY_STR} = require('../../../utils/fumoir/consts')
const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const Schema = mongoose.Schema
const lodash = require('lodash')
const {schemaOptions} = require('../../utils/schemas')

const OrderSchema = new Schema(
  {
    billing_number: {
      type: String,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'orderItem',
      },
    ],
    // member or guest have to be fulfilled
    member: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    guest: {
      type: String,
    },
  },
  schemaOptions,
)

OrderSchema.virtual('total_price').get(function() {
  if (!this.items) {
    return 0
  }
  return lodash.sum(this.items.map(i => i.total_price))
})

OrderSchema.virtual('paid').get(function() {
  if (!this.items || this.items.length==0) {
    return false
  }
  return this.items.every(i => i.paid==true)
})

OrderSchema.virtual('paid_str').get(function() {
  if (!this.items || this.items.length==0) {
    return TO_PAY_STR
  }
  return this.items.every(i => i.paid==true) ? PAID_STR : TO_PAY_STR
})

OrderSchema.plugin(mongooseLeanVirtuals)

module.exports = OrderSchema
