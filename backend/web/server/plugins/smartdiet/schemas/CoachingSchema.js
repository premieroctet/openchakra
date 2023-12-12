const {
  APPOINTMENT_PAST,
  AVAILABILITIES_RANGE_DAYS,
  COACHING_MODE,
  QUIZZ_TYPE_LOGBOOK,
  QUIZZ_TYPE_PATIENT,
  QUIZZ_TYPE_PROGRESS,
  ROLE_CUSTOMER,
  ROLE_EXTERNAL_DIET
} = require('../consts')
const moment = require('moment')
const { CREATED_AT_ATTRIBUTE } = require('../../../../utils/consts')
const mongoose = require('mongoose')
const { schemaOptions } = require('../../../utils/schemas')
const lodash=require('lodash')
const {intersection, idEqual}=require('../../../utils/database')

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
    required: true,
  }],
  dummy: {
    type: Number,
    default: 0,
    required: true,
  },
  food_documents: [{
    type: Schema.Types.ObjectId,
    ref: 'foodDocument',
    required: true,
  }],
  quizz_templates: [{
    type: Schema.Types.ObjectId,
    ref: 'quizz',
    required: true,
  }],
  quizz: [{
    type: Schema.Types.ObjectId,
    ref: 'userQuizz',
    required: true,
  }],
  progress: {
    type: Schema.Types.ObjectId,
    ref: 'userQuizz',
    required: false,
  },
  // Food program URL
  food_program: {
    type: String,
  },
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

CoachingSchema.virtual('all_logbooks', {
  ref: 'coachingLogbook',
  localField: '_id',
  foreignField: 'coaching',
})


CoachingSchema.virtual('remaining_credits').get(function() {
  if (this.user?.role!=ROLE_CUSTOMER) {
    return 0
  }
  return (this.user?.offer?.coaching_credit-this.spent_credits) || 0
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
/* TODO Criterion :
- remove if no smartagenda
- remove if no availabilities in the 15 next days
- remove if my company not in diet's customer_companies
- remove if coaching not in diet's activities
- keep then sort by reasons
*/
CoachingSchema.virtual('available_diets', {localField:'tagada', foreignField:'tagada'}).get(function() {
  const expected_app_type=this.appointment_type?._id
  return lodash(this._all_diets)
    // Diets allowing coaching
    .filter(d => d.diet_coaching_enabled)
    // Diets managing this company
    .filter(d => d.customer_companies?.map(c => c._id).includes(this.user?.company._id))
    // Diets having availability in the 15 next days for this kind of appointment
    .filter(d => d.availability_ranges?.some(r => idEqual(r.appointment_type._id, expected_app_type)))
    .orderBy(u => intersection(u.reasons, this.reasons), 'desc')
    .value()
})

// Returns the current objectoves (i.e. the newest appointment's ones)
CoachingSchema.virtual('current_objectives', {localField:'tagada', foreignField:'tagada'}).get(function() {
  return lodash(this.appointments)
   .orderBy(app => app[CREATED_AT_ATTRIBUTE].start_date, 'desc')
   .head()?.objectives || []
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

const duplicateUserQuizz= id => {
  return mongoose.models.quizz.findById(id).populate('questions')
    .then(q => q.cloneAsUserQuizz(null))
}

// Returns the LogbookDay compléting if required
CoachingSchema.virtual('logbooks', {localField:'tagada', foreignField:'tagada'}).get(function() {
  const startDay=moment(this.user[CREATED_AT_ATTRIBUTE])
  const diff=moment().diff(startDay, 'days')
  const lbd=lodash.range(diff).map(day_idx => {
    const day=moment(startDay).add(day_idx, 'day')
    const foundLogbooks=this.all_logbooks?.filter(l => day.isSame(l.day, 'day'))
    return new mongoose.models.logbookDay({day, logbooks:foundLogbooks?.map(fl => fl.logbook)})
  })
  return lbd
})

// Returned availabilities are not store in database
CoachingSchema.virtual('diet_availabilities', {localField:'tagada', foreignField:'tagada'}).get(function() {

  if (!this.diet){
    return []
  }

  const appType=this.appointment_type

  const diet_availabilities=this.diet.availability_ranges

  const availabilities=lodash.range(AVAILABILITIES_RANGE_DAYS).map(day_idx => {
    const day=moment().add(day_idx, 'day').startOf('day')
    const ranges=diet_availabilities?.filter(r => day.isSame(r.start_date, 'day') && idEqual(r.appointment_type._id, appType?._id)) || []
    return ({
      date: day,
      ranges: lodash.orderBy(ranges, 'start_date'),
    })
  })
  return availabilities
});

// Returns the appointment type expected (1st appnt: assesment, others: followu)
CoachingSchema.virtual('appointment_type', {localField:'tagada', foreignField:'tagada'}).get(function() {
  const appType=lodash.isEmpty(this.appointments) ? this.user?.company?.assessment_appointment_type : this.user?.company?.followup_appointment_type
  return appType
})
/* eslint-enable prefer-arrow-callback */


module.exports = CoachingSchema
