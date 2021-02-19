const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceAccessSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'service',
    required : true,
  },
  // Service allowed to company
  company_allow: {
    type: Schema.Types.ObjectId,
    ref: 'company',
  },
  // Service forbdidden to buyer
  buyer_forbid: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
}, {toJSON: {virtuals: true, getters: true}});

const ServiceAccess = mongoose.model('serviceAccess', ServiceAccessSchema);

module.exports = ServiceAccess;
