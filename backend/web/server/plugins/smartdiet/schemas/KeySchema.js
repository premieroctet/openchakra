const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const KeySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  picture: {
    type: String,
    required: [true, 'L\'illustration est obligatoire'],
  },
  color: {
    type: String,
    required: false,
  },
  spoons_count_for_trophy: {
    type: Number,
    required: [true, 'Le nombre de cuillères néecssaires pour un trophée est obligatoire']
  },
  trophy_on_picture: {
    type: String,
    required: [true, "L'illustration de trophée obtenu est obligatoire"],
  },
  trophy_off_picture: {
    type: String,
    required: [true, "L'illustration de trophée non obtenu est obligatoire"],
  },
}, schemaOptions)

KeySchema.virtual('user_spoons')

KeySchema.virtual('trophy_picture')

KeySchema.virtual('user_survey_average').get(function() {
  return 0
})

module.exports = KeySchema
