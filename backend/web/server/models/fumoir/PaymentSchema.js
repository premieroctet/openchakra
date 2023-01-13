const {
  CURRENT,
  FINISHED,
  MAX_BOOKING_GUESTS,
  PAID_STR,
  PLACES,
  TO_COME,
  TO_PAY_STR,
} = require('../../../utils/fumoir/consts');
const moment = require('moment')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')

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
  total_amount: {
    type: Number,
    min: 0,
    required: true,
  },
  vat_amount: {
    type: Number,
    min: 0,
    required: true,
  },
  },
  schemaOptions,
)

PaymentSchema.virtual('net_amount').get(function(){
  return this.total_amount-this.vat_amount
})

module.exports = PaymentSchema
