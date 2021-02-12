const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {COMPANY_SIZE, COMPANY_ACTIVITY}=require('../../utils/consts')

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
  size : {
    enum : Object.keys(COMPANY_SIZE)
  },
  billing_address: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    country: {
      type: String,
    },
    gps: {
      lat: Number,
      lng: Number,
    },
  },
  service_address: [{
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    label: {
      type: String,
    },
  }],
  vat_number : {
    type: String,
  },
  activity: {
    enum : Object.keys(COMPANY_ACTIVITY),
  }

}, {toJSON: {virtuals: true, getters: true}});


const Company = mongoose.model('company', CompanySchema);

module.exports = Company