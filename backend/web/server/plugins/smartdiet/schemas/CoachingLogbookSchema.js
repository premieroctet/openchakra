const moment = require('moment')
const mongoose = require('mongoose')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const CoachingLogbookSchema = new Schema({
  coaching: {
    type: Schema.Types.ObjectId,
    ref: 'coaching',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  day: {
    type: Date,
    set: d => moment(d).startOf('day'),
    required: [true, 'Le jour est obligatoire'],
  },
  logbook: {
    type: Schema.Types.ObjectId,
    ref: 'userQuizz',
    required: true,
  },
}, schemaOptions)

module.exports = CoachingLogbookSchema
