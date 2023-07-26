const { COACHING_MODE, ROLE_EXTERNAL_DIET } = require('../consts')
const { CREATED_AT_ATTRIBUTE } = require('../../../../utils/consts')
const mongoose = require('mongoose')
const { schemaOptions } = require('../../../utils/schemas')
const lodash=require('lodash')
const {intersection}=require('../../../utils/database')

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
  mode: {
    type: String,
    enum: Object.keys(COACHING_MODE),
    required: false,
  },
  reasons: [{
    type: Schema.Types.ObjectId,
    // TODO: check that target's category's type is TARGET_COACHING
    ref: 'target',
    required: false,
  }],
  dummy: {
    type: Number,
    default: 0,
    required: true,
  },
  progress_quizz: {
    type: Schema.Types.ObjectId,
    // TODO: check that target's category's type is TARGET_COACHING
    ref: 'quizz',
    required: false,
  },
  food_documents: [{
    type: Schema.Types.ObjectId,
    ref: 'foodDocument',
    required: true,
  }],
  // Logbooks & patient quizzs & progress
  quizz: [{
    type: Schema.Types.ObjectId,
    ref: 'quizz',
    required: true,
  }],
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
// Required for register validation only
CoachingSchema.virtual('appointments', {
  ref: 'appointment',
  localField: '_id',
  foreignField: 'coaching',
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
  return this.appointments?.length || 0
})

// all diets (hidden)
CoachingSchema.virtual("_all_diets", {
  ref: "user", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy", // is equal to foreignField
  options: {
    match: {role: ROLE_EXTERNAL_DIET},
  },
})

// Returns available diets order by compatible reasons count
CoachingSchema.virtual('available_diets', {localField:'tagada', foreignField:'tagada'}).get(function() {
  return lodash(this._all_diets)
  .orderBy(u => intersection(u.reasons, this.reasons), 'desc')
  .value()
})

// Returns the current objectoves (i.e. the newest appointment's ones)
CoachingSchema.virtual('current_objectives', {localField:'tagada', foreignField:'tagada'}).get(function() {
  return lodash(this.appointments)
   .orderBy(app => app[CREATED_AT_ATTRIBUTE].start_date, 'desc')
   .head()?.objectives || []
})

/* eslint-enable prefer-arrow-callback */


module.exports = CoachingSchema
