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
  order: {
    type: Number,
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

KeySchema.virtual('user_spoons').get(function(){
  return null
})

KeySchema.virtual('user_spoons_str').get(function(){
  return null
})

KeySchema.virtual('user_progress').get(function(){
  return null
})

KeySchema.virtual('user_surveys_progress', {localField: 'tagada', foreignField:'tagada'}).get(function(){
  return null
})

KeySchema.virtual('user_read_contents').get(function(){
  return null
})

KeySchema.virtual('user_passed_challenges').get(function(){
  return null
})

KeySchema.virtual('user_passed_webinars').get(function(){
  return null
})

KeySchema.virtual('trophy_picture').get(function () {
  return null
})

module.exports = KeySchema
