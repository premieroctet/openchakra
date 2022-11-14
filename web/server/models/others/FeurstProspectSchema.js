const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FeurstProspectSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    set: v => v.toLowerCase().trim(),
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: false,
  },
}, {toJSON: {virtuals: true, getters: true}})

FeurstProspectSchema.plugin(mongooseLeanVirtuals)
module.exports = FeurstProspectSchema
