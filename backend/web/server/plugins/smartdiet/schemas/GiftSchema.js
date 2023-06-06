const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {SPOON_SOURCE} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const GiftSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  description: {
    type: String,
    required: [true, "La description est obligatoire"],
  },
  picture: {
    type: String,
    required: [true, "L'illustration est obligatoire"],
  },
}, schemaOptions)

module.exports = GiftSchema
