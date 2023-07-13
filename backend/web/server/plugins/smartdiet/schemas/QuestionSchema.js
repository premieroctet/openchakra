const mongoose = require('mongoose')
const moment=require('moment')
const { idEqual, shareTargets } = require('../../../utils/database')
const {schemaOptions} = require('../../../utils/schemas')
const {ACTIVITY, ROLES, ROLE_CUSTOMER, ROLE_RH, STATUS_FAMILY} = require('../consts')
const {GENDER} = require('../consts')
const lodash=require('lodash')

const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  title: {
    type: String,
    set: v => v?.trim(),
    required: [true, 'La question est obligatoire'],
  },
  picture: {
    type: String,
    required: [true, "L'illustration est obligatoire"],
  },
  order: {
    type: Number,
    min: 1,
    index: {
      unique: [true, 'Chaque quesiton doit avoir un ordre différent'],
    },
    required: [true, "L'ordre est obligatoire"]
  },
  description: {
    type: String,
    set: v => v?.trim(),
    required: false,
  },
  sub_description: {
    type: String,
    set: v => v?.trim(),
    required: false,
  },
  subtitle_never: {
    type: String,
    required: false,
  },
  subtitle_sometimes: {
    type: String,
    required: false,
  },
  subtitle_often: {
    type: String,
    required: false,
  },
  subtitle_always: {
    type: String,
    required: false,
  },
  key: {
    type: Schema.Types.ObjectId,
    ref: 'key',
    required: false,
  },

}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
/* eslint-enable prefer-arrow-callback */


module.exports = QuestionSchema
