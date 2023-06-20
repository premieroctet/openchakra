const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const ChallengeUserPipSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'teamMember',
    required: [true, "Le compte dans l'équipe est obligatoire"],
  },
  pip: {
    type: Schema.Types.ObjectId,
    ref: 'challengePip',
    required: [true, 'Le pépin du challenge est obligatoire'],
  },
  proof: {
    type: String,
    required: false,
  },
  valid: {
    type: Boolean,
    default: false,
    required: true,
  }
}, schemaOptions)

module.exports = ChallengeUserPipSchema
