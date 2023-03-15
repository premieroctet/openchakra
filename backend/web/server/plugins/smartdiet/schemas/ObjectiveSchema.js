const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const ObjectiveSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  category: {
    type: String,
    required: [true, 'La catégorie est obligatoire'],
  },
  logo: {
    type: String,
    required: [true, 'Le logo est obligatoire'],
  },
}, schemaOptions)

module.exports = ObjectiveSchema
