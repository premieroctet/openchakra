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
    min: [value => value>=0, 'Le prix H.T. doit être >=0'],
    required: [true, 'Le prix H.T. est obligatoire'],
  },
  vat: {
    type: Number,
    min: 0,
    max: 1.0,
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
  return this.ht_price*this.quantity*(1+this.vat)
})

QuotationDetailSchema.virtual('vat_total').get(function() {
  return this.ht_price*this.quantity*this.vat
})

module.exports = QuotationDetailSchema;
