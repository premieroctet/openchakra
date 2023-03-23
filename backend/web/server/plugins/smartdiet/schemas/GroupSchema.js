const mongoose = require('mongoose')
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
  // Targets: specificity/objectives
  targets: {
    type: Schema.Types.ObjectId,
    ref: 'target',
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: false,
  },
}, schemaOptions)

module.exports = GroupSchema
