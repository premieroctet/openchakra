const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {SPOON_SOURCE} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const PriceListSchema = new Schema({
  date: {
    type: Date,
    required: [true, `La date d'application est obligatoire`],
  },
  assessment: {
    type: Number,
    required: [true, `Le tarif de bilan est obligatoire`]
  },
  followup: {
    type: Number,
    required: [true, `Le tarif de suivi est obligatoire`]
  },
  nutrition: {
    type: Number,
    required: [true, `Le tarif de conseil nutritionnel est obligatoire`]
  },
  impact: {
    type: Number,
    default: 0,
    required: [true, `Le tarif d'étude d'impact est obligatoire`]
  },
}, schemaOptions)

module.exports = PriceListSchema
