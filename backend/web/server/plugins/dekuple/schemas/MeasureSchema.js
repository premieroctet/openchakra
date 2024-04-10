const {
  HEARTBEAT_MAX,
  HEARTBEAT_MIN,
  DIA_MAX,
  DIA_MIN,
  MEASURE_AUTO,
  MEASURE_MANUAL,
  MEASURE_SOURCE,
  SYS_MAX,
  SYS_MIN
} = require('../consts')
const mongoose = require('mongoose')
const moment=require('moment')
const lodash=require('lodash')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const MeasureSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, `Le patient est obligatoire`],
  },
  date: {
    type: Date,
    max: [() => moment(), 'La date ne peut être dans le futur'],
    required: [true, 'La date est obligatoire'],
  },
  sys: {
    type: Number,
    validate: {
      validator: function(v) {
        return this.withings_group || lodash.range(SYS_MIN, SYS_MAX+1).includes(v)
      },
      message: `La mesure systolique doit être comprise entre ${SYS_MIN} et ${SYS_MAX} mmHg`,
    },
    required: [function(){return !this.withings_group}, 'La mesure systolique est obligatoire'],
  },
  dia: {
    type: Number,
    validate: {
      validator: function(v) {
        return this.withings_group || lodash.range(DIA_MIN, DIA_MAX+1).includes(v)
      },
      message: `La mesure diastolique doit être comprise entre ${DIA_MIN} et ${DIA_MAX} mmHg`,
    },
    required: [function(){return !this.withings_group}, 'La mesure diastolique est obligatoire'],
  },
  heartbeat: { // BPM
    type: Number,
    validate: {
      validator: function(v) {
        return this.withings_group || lodash.range(HEARTBEAT_MIN, HEARTBEAT_MAX+1).includes(v)
      },
      message: `Le pouls doit être compris entre ${HEARTBEAT_MIN} et ${HEARTBEAT_MAX} bpm`,
    },
    required: [function(){return !this.withings_group}, 'La mesure du pouls est obligatoire'],
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
