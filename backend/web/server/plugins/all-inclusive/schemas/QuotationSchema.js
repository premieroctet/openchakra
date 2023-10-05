const { AA_RATE, MER_RATE, VAT_RATE } = require('../consts')
const { isPhoneOk } = require('../../../../utils/sms')
const mongoose = require('mongoose')
const lodash=require('lodash')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const QuotationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  description: {
    type: String,
    required: false,
  },
  reference: {
    type: String,
    required: false,
  },
  notice: {
    type: String,
    required: false,
  },
  firstname: {
    type: String,
    required: [true, 'Le prénom est obligatoire'],
  },
  lastname: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  phone: {
    type: String,
    validate: [v => !v || isPhoneOk(v), 'Le numéro de téléphone doit commencer par 0 ou +33'],
    required: false,
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
  },
  company_name: {
    type: String,
    required: [true, 'Le nom de la compagnie est obligatoire'],
  },
  company_address: {
    type: String,
    required: false,
  },
  representative_firstname: {
    type: String,
    required: false,
  },
  representative_lastname: {
    type: String,
    required: false,
  },
  mission: {
    type: Schema.Types.ObjectId,
    ref: 'mission',
    required: false,
  },
}, schemaOptions,
)

QuotationSchema.virtual('details', {
  ref: 'quotationDetail', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'quotation', // is equal to foreignField
})

// TODO: must use this.mer instead of direct computation
QuotationSchema.virtual('customer_total').get(function() {
  return this.gross_total+this.mer_total
})

QuotationSchema.virtual('mer_ht').get(function() {
  // Mission without customer => handled by TIPI
  const mer_rate=this.mission?.job?.user?.qualified ? MER_RATE : 0
  return this.gross_ht*mer_rate
})

QuotationSchema.virtual('mer_vat').get(function() {
  return this.mer_ht*VAT_RATE
})

QuotationSchema.virtual('mer_total').get(function() {
  return this.mer_ht+this.mer_vat
})

QuotationSchema.virtual('gross_total').get(function() {
  return lodash.sumBy(this.details, 'total') || 0
})

QuotationSchema.virtual('aa_ht').get(function() {
  const aa=this.gross_ht*AA_RATE
  return aa
})

QuotationSchema.virtual('aa_vat').get(function() {
  const aa=this.aa_ht*VAT_RATE
  return aa
})

QuotationSchema.virtual('aa_total').get(function() {
  const aa=this.aa_ht+this.aa_vat
  return aa
})

QuotationSchema.virtual('ti_vat').get(function() {
  const ti_total=this.gross_vat+this.aa_vat
  return ti_total
})

QuotationSchema.virtual('ti_total').get(function() {
  return this.gross_ht-this.aa_total+this.gross_vat
})

QuotationSchema.virtual('gross_vat').get(function() {
  if (lodash.isEmpty(this.details)) {
    return 0
  }
  return lodash.sumBy(this.details, 'vat_total')
})

QuotationSchema.virtual('gross_ht').get(function() {
  if (lodash.isEmpty(this.details)) {
    return 0
  }
  return lodash.sumBy(this.details, 'ht_total')
})

QuotationSchema.virtual('customer_ht').get(function() {
  return this.gross_ht+this.mer_ht
})

QuotationSchema.virtual('customer_vat').get(function() {
  return this.gross_vat+this.mer_vat
})

QuotationSchema.methods.canSend = function(user) {
  return !lodash.isEmpty(this.details)
}

module.exports = QuotationSchema
