const { isEmailOk } = require('../../../../utils/sms')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const bcrypt = require('bcryptjs')

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
      set: v => v?.toLowerCase().trim(),
      validate: [value => isEmailOk(value), "L'email est invalide"],
      required: [true, "L'email est obligatoire"],
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire'],
      set: pass => bcrypt.hashSync(pass, 10),
    },
  },
  schemaOptions,
)

UserSchema.virtual("fullname").get(function() {
  return `${this.firstname} ${this.lastname}`;
});

// For password checking only
UserSchema.virtual("password2")

module.exports = UserSchema
