const mongoose = require('mongoose')
const moment = require('moment')
const {schemaOptions} = require('../../../utils/schemas')

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
    required: [true, 'Le coaching est obligatoire'],
  },
},
{...schemaOptions}
)

/* eslint-disable prefer-arrow-callback */
NutritionAdviceSchema.virtual('end_date').get(function() {
  const end=moment(this.start_date).add(this.duration, 'minutes')
  return end.isValid() ? end : null
})
/* eslint-enable prefer-arrow-callback */

module.exports = NutritionAdviceSchema
