const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {SPOON_SOURCE} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const InterestSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le label est obligatoire'],
  },
  description: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
}, schemaOptions)

module.exports = InterestSchema
