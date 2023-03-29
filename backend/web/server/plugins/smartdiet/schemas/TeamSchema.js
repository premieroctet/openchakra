const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const TeamSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  members: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  // Won spoons
  spoons: {
    type: Number,
  },
  key: {
    type: Schema.Types.ObjectId,
    ref: 'key',
    required: [true, "La clé est obligatoire"],
  },
}, schemaOptions)

module.exports = TeamSchema
