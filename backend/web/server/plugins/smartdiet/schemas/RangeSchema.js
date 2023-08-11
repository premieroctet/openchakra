const mongoose = require('mongoose')
const moment=require('moment')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const RangeSchema = new Schema({
  day: {
    type: Date,
    required: [true, 'Le jour est obligatoire']
  },
  start_time: {
    type: Number,
    required: [true, 'Le début de plage est obligatoire'],
  },
  duration: [{
    type: Number,
    required: [true, 'La durée'],
  }]
}, schemaOptions)

RangeSchema.virtual('range_str').get(function() {
  const start=moment(this.day).startOf('day').add(this.start_time, 'hours')
  const end=moment(start).add(this.duration, 'hours')
  return `${start.format('HH:mm')}->${end.format('HH:mm')}`
})

RangeSchema.virtual('start_date').get(function() {
  return moment(this.day).startOf('day').add(this.start_time, 'hours')
})

RangeSchema.virtual('end_date').get(function() {
  const start=moment(this.day).startOf('day').add(this.start_time, 'hours')
  return end=moment(start).add(this.duration, 'hours')
})


module.exports = RangeSchema
