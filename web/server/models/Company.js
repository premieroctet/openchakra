const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

}, {toJSON: {virtuals: true, getters: true}});


const Company = mongoose.model('company', CompanySchema);

module.exports = Company
