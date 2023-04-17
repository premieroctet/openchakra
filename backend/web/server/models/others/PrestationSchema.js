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
    ref: 'service',
    required: true,
  },
  billing: [{
    type: Schema.Types.ObjectId,
    ref: 'billing',
  }],
  filter_presentation: {
    type: Schema.Types.ObjectId,
    ref: 'filterPresentation',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'job',
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
  },
  private_alfred: {
    type: Schema.Types.ObjectId,
    ref: 'user',
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
    ref: 'company',
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
    default: 0,
    required: true,
  },
})

PrestationSchema.index({label: 'text'})

module.exports =PrestationSchema
