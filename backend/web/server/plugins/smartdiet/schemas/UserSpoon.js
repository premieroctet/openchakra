const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {SPOON_SOURCE} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const UserSpoonSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, "Le compte est obligatoire"],
  },
  count: {
    type: Number,
    required: true,
    required: [true, "Le nombre de cuillères est obligatoire"],
  },
  source: {
    type: String,
    enum: Object.keys(SPOON_SOURCE),
    required: [true, "La source de cuillères est obligatoire"],
  },
}, schemaOptions)

module.exports = UserSpoonSchema
