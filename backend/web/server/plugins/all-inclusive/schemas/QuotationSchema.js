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

QuotationSchema.virtual('total').get(function() {
  if (lodash.isEmpty(this.details)) {
    return 0
  }
  return lodash.sumBy(this.details, 'total')
})

QuotationSchema.virtual('vat_total').get(function() {
  if (lodash.isEmpty(this.details)) {
    return 0
  }
  return lodash.sumBy(this.details, 'vat_total')
})

QuotationSchema.methods.canSend = function(user) {
  return !lodash.isEmpty(this.details)
}

module.exports = QuotationSchema
