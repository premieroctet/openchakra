const mongoose = require('mongoose')
const moment=require('moment')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const AvailabilitySchema = new Schema({
  date: {
    type: Date,
    set: m => m && moment(m).startOfDay(),
    required: [true, 'Le jour est obligatoire'],
  },
  ranges: [{
    type: Schema.Types.ObjectId,
    ref: 'range',
  }]
}, schemaOptions)


module.exports = AvailabilitySchema
