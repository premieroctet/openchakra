const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')

const Schema = mongoose.Schema

const GuestSchema = new Schema(
  {
    email: {
      type: String,
      required: false, // required: true,
    },
    phone: {
      type: String,
      required: false, // required: true,
    },
  },
  schemaOptions,
)

module.exports = GuestSchema
