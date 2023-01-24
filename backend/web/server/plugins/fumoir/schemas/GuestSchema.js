const mongoose = require('mongoose')
const Validator = require('validator')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const GuestSchema = new Schema(
  {
    email: {
      type: String,
      validate: v => !v || Validator.isEmail(v),
      required: [true, 'L\'email de l\'invité est obligatoire']
    },
    phone: {
      type: String,
      required: false, // required: true,
    },
  },
  schemaOptions,
)

module.exports = GuestSchema
