const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const AddressSchema=require('../../../models/AddressSchema')

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
  address: {
    type: AddressSchema,
    required: true,
  },
}, schemaOptions,
)

module.exports = TrainingCenterSchema
