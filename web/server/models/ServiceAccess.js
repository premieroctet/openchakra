const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceAccessSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'service',
    required : true,
  },
  // Service allowed to group
  group: {
    type: Schema.Types.ObjectId,
    ref: 'group',
  },
}, {toJSON: {virtuals: true, getters: true}});

const ServiceAccess = mongoose.model('serviceAccess', ServiceAccessSchema);

module.exports = ServiceAccess;
