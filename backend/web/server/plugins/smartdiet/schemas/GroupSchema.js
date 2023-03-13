const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const GroupSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  picture: {
    type: String,
    required: [true, 'L\'illustration est obligatoire'],
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire'],
  },
  moderator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Le modérateur est obligatoire'],
  },
  // Specificity or objective : requires one amongst the two
  specificity: {
    type: Schema.Types.ObjectId,
    ref: 'specificity',
  },
  objective: {
    type: Schema.Types.ObjectId,
    ref: 'objective',
  },
}, schemaOptions)

module.exports = GroupSchema
