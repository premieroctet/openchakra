const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {SPOON_SOURCE} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const SpoonGainSchema = new Schema({
  source: {
    type: String,
    enum: Object.keys(SPOON_SOURCE),
    required: [true, "La source de cuillères est obligatoire"],
  },
  gain: {
    type: Number,
    required: [true, "Le nombre de cuillères gagnées est obligatoire"],
  }
}, schemaOptions)

module.exports = SpoonGainSchema
