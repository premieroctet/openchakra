const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PrestationSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: false,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  billing: [{
    type: Schema.Types.ObjectId,
    ref: 'Billing',
  }],
  filter_presentation: {
    type: Schema.Types.ObjectId,
    ref: 'FilterPresentation',
  },
  search_filter: [{
    type: Schema.Types.ObjectId,
    ref: 'SearchFilter',
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  calculating: {
    type: Schema.Types.ObjectId,
    ref: 'Calculating',
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  private_alfred: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  s_label: {
    type: String,
    required: true,
    sparse: true,
  },
  cesu_eligible: {
    type: Boolean,
    default: false,
  },
  // Particulars can book
  particular_access: {
    type: Boolean,
    required: true,
    sparse: true,
  },
  // Professionals can book
  professional_access: {
    type: Boolean,
    required: true,
    sparse: true,
  },
  private_company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  order: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    default: 1,
  },
  // Price in partner catalog
  company_price: {
    type: Number,
  },
})

PrestationSchema.index({label: 'text'})

module.exports = PrestationSchema
