const { MEASURE_AUTO, MEASURE_MANUAL, MEASURE_SOURCE } = require('../consts')
const mongoose = require('mongoose')
const lodash=require('lodash')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const MeasureSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  sys: {
    type: Number,
    required: false,
  },
  dia: {
    type: Number,
    required: false,
  },
  heartbeat: { // BPM
    type: Number,
    required: false,
  },
  // Group measure id
  withings_group: {
    type: Number,
    required: false,
  },
}, schemaOptions)

MeasureSchema.virtual('recommandation').get(function() {
  const sys=this.sys
  const dia=this.dia

  if (sys<100 || dia < 60) {
    return 'Faire automesure sur 3 jours et prendre avis médical'
  }
  if (sys>130 || dia > 80) {
    return 'Faire automesure sur 3 jours et prendre avis médical'
  }
  if (lodash.inRange(sys, 100, 130.1) && lodash.inRange(dia, 60, 80.1)) {
    return 'Refaire autotest au moins une fois par an'
  }
})

MeasureSchema.virtual('source').get(function() {
  const src=!!this.withings_group ? MEASURE_AUTO : MEASURE_MANUAL
  return src
})


module.exports = MeasureSchema
