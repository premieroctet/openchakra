const {
} = require('../consts')
const mongoose = require("mongoose")
const bcrypt=require('bcryptjs')
const { schemaOptions } = require('../../../utils/schemas')
const IBANValidator = require('iban-validator-js')

const Schema = mongoose.Schema;

const QuotationDetailSchema = new Schema({
  label: {
    type: String,
    required: [true, "L'intitulé est obligatoire"],
  },
  quantity: {
    type: Number,
    required: [true, 'La quantité est obligatoire'],
  },
  ht_price: {
    type: Number,
    required: [true, 'Le prix H.T. est obligatoire'],
  },
  // 0 < vat < 100
  vat: {
    type: Number,
    min: [0, 'Le taux de TVA doit être compris entre 0% et 100%'],
    max: [100, 'Le taux de TVA doit être compris entre 0% et 100%'],
    set: v => v || 0,
    required: [true, 'Le taux de TVA est obligatoire'],
  },
  quotation: {
    type: Schema.Types.ObjectId,
    ref: "quotation",
    required: [true, 'La ligne doit être attaché à un devis'],
  },
}, schemaOptions
);

QuotationDetailSchema.virtual('total').get(function() {
  return this.ht_price*this.quantity*(1+this.vat/100.0)
})

QuotationDetailSchema.virtual('vat_total').get(function() {
  return this.ht_price*this.quantity*this.vat/100.0
})

QuotationDetailSchema.virtual('ht_total').get(function() {
  return this.ht_price*this.quantity
})

module.exports = QuotationDetailSchema;
