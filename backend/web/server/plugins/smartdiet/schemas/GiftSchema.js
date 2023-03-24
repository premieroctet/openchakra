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
  // Spoons required to get this trophy
  description: {
    type: String,
    required: [true, "La description est obligatoire"],
  },
  // Source of spoons required to get this trophy
  picture: {
    type: String,
    required: [true, "L'illustration est obligatoire"],
  },
  trophy: {
    type: Schema.Types.ObjectId,
    ref: 'trophy',
    required: [true, 'Le lien vers trophée est obligatoire'],
  },
}, schemaOptions)

module.exports = GiftSchema
