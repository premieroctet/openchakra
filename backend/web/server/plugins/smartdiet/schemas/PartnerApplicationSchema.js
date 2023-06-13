const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const PartnerApplicationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire'],
  },
  url: {
    type: String,
    required: [true, "Le lien est obligatoire"],
  },
  picture: {
    type: String,
    required: [true, "L'illustration est obligatoire"],
  },
  key: {
    type: Schema.Types.ObjectId,
    ref: 'key',
    required: [true, "La clé est obligatoire"],
  },
}, schemaOptions)

module.exports = PartnerApplicationSchema
