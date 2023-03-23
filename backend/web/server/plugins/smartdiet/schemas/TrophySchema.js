const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {SPOON_SOURCE} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const TrophySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  picture: {
    type: String,
    required: [true, "L'illustration est obligatoire"],
  },
  // Spoons required to get this trophy
  spoons_count: {
    type: Number,
    required: [true, "Le nombre de cuillères est obligatoire"],
  },
  // Source of spoons required to get this trophy
  spoons_source: [{
    type: String,
    enum: Object.keys(SPOON_SOURCE),
    required: [true, "Le type de cuillères est obligatoire"],
  }],
}, schemaOptions)

module.exports = TrophySchema
