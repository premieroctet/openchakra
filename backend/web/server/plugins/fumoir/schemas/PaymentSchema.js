const { CREATED_AT_ATTRIBUTE } = require('../../../../utils/consts')
const Booking = require('../../../models/Booking')
const { CASH_MODE, PAYMENT_CREATED, PAYMENT_STATUS } = require('../consts')
const mongoose = require('mongoose')
const moment = require('moment')
const {schemaOptions} = require('../../../utils/schemas')
const autoIncrement = require('mongoose-auto-increment')

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
  },
  receipt_id:{
    type: Number,
    required: true,
  }
},
schemaOptions,
)

// Ensure autoincrement is initalized
if (mongoose.connection) {
  autoIncrement.initialize(mongoose.connection)
}

PaymentSchema.plugin(autoIncrement.plugin, { model: 'payment', field: 'receipt_id' });

PaymentSchema.virtual('receipt_number').get(function() {
  const date_part=moment(this[CREATED_AT_ATTRIBUTE]).format('yyyy-MM')
  const id_part=this.receipt_id?.toString().padStart(6, '0')
  return `${date_part}-${id_part}`
})

PaymentSchema.virtual('net_amount').get(function() {
  return this.amount-this.vat_amount
})

PaymentSchema.virtual('customer_str').get(function() {
  if (this.member) {
    return `${this.member.firstname} ${this.member.lastname}`
  }
  if (this.guest) {
    return `${this.guest.email}`
  }
})

module.exports = PaymentSchema
