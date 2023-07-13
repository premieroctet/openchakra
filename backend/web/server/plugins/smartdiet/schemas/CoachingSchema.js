const { schemaOptions } = require('../../../utils/schemas')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CoachingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Le patient est obligatoire'],
  },
  diet: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: false,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
// Required for register validation only
CoachingSchema.virtual('consultations', {
  ref: 'consultation',
  localField: '_id',
  foreignField: 'consultation',
})

CoachingSchema.virtual('questions', {
  ref: 'userCoachingQuestion',
  localField: '_id',
  foreignField: 'coaching',
})


CoachingSchema.virtual('remaining_credits').get(function() {
  return (this.user.offer?.coaching_credit-this.spent_credits) || 0
})

CoachingSchema.virtual('spent_credits').get(function() {
  return this.consultations?.length || 0
})

/* eslint-enable prefer-arrow-callback */


module.exports = CoachingSchema
