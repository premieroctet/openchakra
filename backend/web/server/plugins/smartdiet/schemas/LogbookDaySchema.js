const moment = require('moment')
const mongoose = require('mongoose')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const LogbookDaySchema = new Schema({
  day: {
    type: Date,
    set: d => moment(d).startOf('day'),
    required: [true, 'Le jour est obligatoire'],
  },
  logbooks: [{
    type: Schema.Types.ObjectId,
    ref: 'userQuizz',
    required: true,
  }],
}, schemaOptions)

module.exports = LogbookDaySchema
