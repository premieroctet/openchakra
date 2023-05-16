const { CONTACT_STATUS } = require('../consts')
const mongoose = require("mongoose")
const { schemaOptions } = require('../../../utils/schemas')

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  firstname: String,
  lastname: String,
  company_name: String,
  status: {
    type: String,
    enum: Object.keys(CONTACT_STATUS),
  },
  email: String,
  phone: String,
  region: String,
  message: String,
  urgent: Boolean,
}, schemaOptions
);

module.exports = CompanySchema;
