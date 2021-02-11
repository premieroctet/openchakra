const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {normalize} = require('../../utils/text');

const PrestationSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'service',
  },
  billing: [{
    type: Schema.Types.ObjectId,
    ref: 'billing',
  }],
  filter_presentation: {
    type: Schema.Types.ObjectId,
    ref: 'filterPresentation',
  },
  search_filter: [{
    type: Schema.Types.ObjectId,
    ref: 'searchFilter',
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
  calculating: {
    type: Schema.Types.ObjectId,
    ref: 'calculating',
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
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tag',
  }],
  private_alfred: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  s_label: {
    type: String,
  },
  cesu_eligible: {
    type: Boolean,
    default: false,
  },
  // Particulars can book
  particular_access: {
    type: Boolean,
    required: true,
  },
  // Professionals can book
  professional_access: {
    type: Boolean,
    required: true,
  }
});

PrestationSchema.index({label: 'text'});

const Prestation = mongoose.model('prestation', PrestationSchema);

module.exports = Prestation;
