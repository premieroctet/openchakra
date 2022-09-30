const mongoose = require('mongoose')
const AddressSchema=require('../AddressSchema')

const Schema = mongoose.Schema

const TrainingCenterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  adress: {
    type: AddressSchema,
    required: true,
  },
}, {toJSON: {virtuals: true, getters: true}})

module.exports = TrainingCenterSchema
