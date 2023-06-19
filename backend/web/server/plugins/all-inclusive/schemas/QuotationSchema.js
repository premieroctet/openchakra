const { AA_RATE, MER_RATE } = require('../consts')
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
    validate: [isPhoneOk, 'Le numéro de téléphone doit commencer par 0 ou +33'],
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
  //const cust_total=this.gross_total+this.mer
  const cust_total=this.gross_total+this.ht_total*MER_RATE
  return cust_total
})

// TODO: Compute properly fro non qualified TI
QuotationSchema.virtual('mer').get(function() {
  //const mer_rate=this.mission.job.user.qualified ? MER_RATE : 0
  const mer_rate=MER_RATE
  const mer=this.ht_total*mer_rate
  return mer
})

QuotationSchema.virtual('gross_total').get(function() {
  if (lodash.isEmpty(this.details)) {
    return 0
  }
  return lodash.sumBy(this.details, 'total')
})

QuotationSchema.virtual('aa').get(function() {
  const aa=this.ht_total*AA_RATE
  return aa
})

QuotationSchema.virtual('ti_total').get(function() {
  const ti_total=this.gross_total-this.aa
  return ti_total
})

QuotationSchema.virtual('vat_total').get(function() {
  if (lodash.isEmpty(this.details)) {
    return 0
  }
  return lodash.sumBy(this.details, 'vat_total')
})

QuotationSchema.virtual('ht_total').get(function() {
  if (lodash.isEmpty(this.details)) {
    return 0
  }
  return lodash.sumBy(this.details, 'ht_total')
})

QuotationSchema.methods.canSend = function(user) {
  return !lodash.isEmpty(this.details)
}

module.exports = QuotationSchema
