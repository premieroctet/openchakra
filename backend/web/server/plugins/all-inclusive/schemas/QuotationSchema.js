const {
  AVAILABILITY,
  COACHING,
  EXPERIENCE,
  QUOTATION_STATUS_ASKING,
  QUOTATION_STATUS_BILL_SENT,
  QUOTATION_STATUS_DISPUTE,
  QUOTATION_STATUS_FINISHED,
  QUOTATION_STATUS_JOB_FINISHED,
  QUOTATION_STATUS_QUOT_ACCEPTED,
  QUOTATION_STATUS_QUOT_REFUSED,
  QUOTATION_STATUS_QUOT_SENT,
  QUOTATION_STATUS_TI_REFUSED,
  QUOTATION_STATUS_TO_BILL,
  ROLES
} = require('../consts')
const mongoose = require("mongoose")
const bcrypt=require('bcryptjs')
const { schemaOptions } = require('../../../utils/schemas')
const IBANValidator = require('iban-validator-js')

const Schema = mongoose.Schema;

const QuotationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "L'utilisateur est obligatoire"],
  },
  // Date when quotation is sent to customer
  quotation_sent_date: {
    type: Date,
  },
  ti_refuse_date: {
    type: Date,
  },
  customer_accept_quotation_date: {
    type: Date,
  },
  customer_refuse_quotation_date: {
    type: Date,
  },
  ti_finished_date: {
    type: Date,
  },
  billing_sent_date: {
    type: Date,
  },
  customer_accept_billing_date: {
    type: Date,
  },
  customer_refuse_billing_date: {
    type: Date,
  },
}, schemaOptions
);

QuotationSchema.virtual('status').get(function() {
  if (this.customer_accept_billing_date) {
    return QUOTATION_STATUS_FINISHED
  }
  if (this.customer_refuse_billing_date) {
    return QUOTATION_STATUS_DISPUTE
  }
  if (this.billing_sent_date) {
    return QUOTATION_STATUS_BILL_SENT
  }
  if (this.ti_finished_date) {
    return QUOTATION_STATUS_TO_BILL
  }
  if (this.customer_refuse_quotation_date) {
    return QUOTATION_STATUS_QUOT_REFUSED
  }
  if (this.customer_accept_quotation_date) {
    return QUOTATION_STATUS_QUOT_ACCEPTED
  }
  if (this.ti_refuse_date) {
    return QUOTATION_STATUS_TI_REFUSED
  }
  if (this.quotation_sent_date) {
    return QUOTATION_STATUS_QUOT_SENT
  }
  return QUOTATION_STATUS_ASKING
})

module.exports = QuotationSchema;
