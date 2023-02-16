const { CASH_MODE, PAYMENT_CREATED, PAYMENT_STATUS } = require('../consts')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const PaymentSchema = new Schema({
  // What was paid
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'booking',
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'event',
  },
  event_member: { // In case of event, who is the memeber
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  // Who paid
  member: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: 'guest',
  },
  // How much was paid
  amount: {
    type: Number,
    min: 0,
    required: true,
  },
  vat_amount: {
    type: Number,
    min: 0,
    required: true,
  },
  // Viva Wallet order code
  orderCode: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: Object.keys(PAYMENT_STATUS),
    default: PAYMENT_CREATED,
    required: true,
  },
  mode: {
    type: String,
    enum: Object.keys(CASH_MODE),
    required: true,
  }
},
schemaOptions,
)

PaymentSchema.virtual('net_amount').get(function() {
  return this.amount-this.vat_amount
})

module.exports = PaymentSchema
