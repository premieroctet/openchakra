const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const ContentsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  picture: {
    type: String,
    required: [true, 'L\'illustration est obligatoire'],
  },
  type: {
    type: String,
    enum: Object.keys(CONTENTS_TYPE),
    required: [true, 'Le type est obligatoire'],
  },
  duration: {
    type: Number,
    required: [true, 'La durée est obligatoire'],
  },
  viewed_by: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  // Specificity or objective : requires one amongst the two
  specificity: {
    type: Schema.Types.ObjectId,
    ref: 'specificity',
  },
  objective: {
    type: Schema.Types.ObjectId,
    ref: 'objective',
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  shares: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  key: [{
    type: Schema.Types.ObjectId,
    ref: 'key',
  }],
}, schemaOptions)

module.exports = ContentsSchema
