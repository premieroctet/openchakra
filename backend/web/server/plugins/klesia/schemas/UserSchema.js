const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Le prénom est obligatoire'],
    },
    lastname: {
      type: String,
      required: [true, 'Le nom de famille est obligatoire'],
    },
    email: {
      type: String,
    },
  },
  schemaOptions,
)


module.exports = UserSchema
