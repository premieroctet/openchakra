const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const TargetSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: [true, 'La catégorie est obligatoire'],
  },
  picture: {
    type: String,
    required: false,
  },
}, schemaOptions)

module.exports = TargetSchema
