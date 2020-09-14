const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillingSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
});

module.exports = Billing = mongoose.model('billing', BillingSchema);
