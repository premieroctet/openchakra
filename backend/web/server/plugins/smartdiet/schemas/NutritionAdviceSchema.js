const mongoose = require('mongoose')
const moment = require('moment')
const {schemaOptions} = require('../../../utils/schemas')
const { DUMMY_REF } = require('../../../utils/database')

const Schema = mongoose.Schema

const NutritionAdviceSchema = new Schema({
  start_date: {
    type: Date,
    default: () => moment(),
    required: [true, 'La date de début est obligatoire']
  },
  duration: {
    type: Number,
    default: 15,
    required: [true, 'La durée est obligatoire']
  },
  comment: {
    type: String,
    required: true,
  },
  food_document: {
    type: Schema.Types.ObjectId,
    ref: 'foodDocument',
    required: false,
  },
  coaching: {
    type: Schema.Types.ObjectId,
    ref: 'coaching',
    required: [function() {return !this?.diet}, `Le coaching est obligatoire`],
  },
  diet: {
    type: Schema.Types.ObjectId,
    ref: 'coaching',
    required: [function() {return !this?.coaching}, `La diet est obligatoire`],
  },
  patient_email: {
    type: String,
    required: [function() {return !this?.coaching}, `L'email du patient est obligatoire`],
  },
  migration_id: {
    type: Number,
    index: true,
    required: false,
  },
},
{...schemaOptions}
)

/* eslint-disable prefer-arrow-callback */
NutritionAdviceSchema.virtual('end_date', DUMMY_REF).get(function() {
  const end=moment(this.start_date).add(this.duration, 'minutes')
  return end.isValid() ? end : null
})
/* eslint-enable prefer-arrow-callback */

module.exports = NutritionAdviceSchema
