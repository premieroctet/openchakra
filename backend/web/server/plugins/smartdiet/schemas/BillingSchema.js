const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {SPOON_SOURCE} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const BillingSchema = new Schema({
  month: {
    type: Date,
    required: [true, `Le mois est obligatoire`],
  },
  assessment_count: {
    type: Number,
    required: true,
  },
  assessment_total: {
    type: Number,
    required: true,
  },
  followup_count: {
    type: Number,
    required: true,
  },
  followup_total: {
    type: Number,
    required: true,
  },
  nutrition_count: {
    type: Number,
    required: true,
  },
  nutrition_total: {
    type: Number,
    required: true,
  },
  impact_count: {
    type: Number,
    required: true,
  },
  impact_total: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
}, schemaOptions)

module.exports = BillingSchema
