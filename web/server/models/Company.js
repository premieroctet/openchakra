const AddressSchema = require('./AddressSchema')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const {COMPANY_SIZE, COMPANY_ACTIVITY}=require('../../utils/consts')
const {hideIllegal} = require('../../utils/text')


const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  siret: {
    type: String,
  },
  // Main adress is always the first one
  addresses: [AddressSchema],
  vat_subject: {
    type: Boolean,
    default: false,
  },
  vat_number: {
    type: String,
  },
  activity: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    set: text => hideIllegal(text),
  },
  // Legal repesentative
  representative: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  // Mangopay as client
  id_mangopay: {
    type: String,
    default: null,
  },
}, {toJSON: {virtuals: true, getters: true}})

CompanySchema.virtual('full_name').get(function() {
  return this.name
})

CompanySchema.virtual('mangopay_provider_id').get(function() {
  return this.id_mangopay
})

module.exports = mongoose.model('company', CompanySchema)
