const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')
const { DUMMY_REF } = require('../../../utils/database')

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
  migration_id: {
    type: Number,
  },
  user_surveys_progress: [{
      type: Schema.Types.ObjectId,
      ref: 'chartPoint',
      required: false,
    }],
}, schemaOptions)

KeySchema.virtual('user_spoons', DUMMY_REF).get(function(){
  return null
})

KeySchema.virtual('user_spoons_str', DUMMY_REF).get(function(){
  return null
})

KeySchema.virtual('user_progress', DUMMY_REF).get(function(){
  return null
})

KeySchema.virtual('user_read_contents', DUMMY_REF).get(function(){
  return null
})

KeySchema.virtual('user_passed_challenges', DUMMY_REF).get(function(){
  return null
})

KeySchema.virtual('user_passed_webinars', DUMMY_REF).get(function(){
  return null
})

KeySchema.virtual('trophy_picture', DUMMY_REF).get(function () {
  return null
})

KeySchema.virtual('dummy', DUMMY_REF).get(function () {
  return 0
})

module.exports = KeySchema
