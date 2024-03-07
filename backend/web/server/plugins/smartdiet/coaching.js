const moment=require('moment')
const lodash=require('lodash')
const Coaching = require("../../models/Coaching")
const Company = require("../../models/Company")
const Quizz = require("../../models/Quizz")
const { COACHING_STATUS_NOT_STARTED, COACHING_STATUS_STARTED, COACHING_STATUS_FINISHED, COACHING_END_DELAY, COACHING_STATUS_DROPPED, 
  COACHING_STATUS_STOPPED, QUIZZ_TYPE_PROGRESS
} = require("./consts")

const updateCoachingStatus = async coaching_id => {
  const coaching=await Coaching.findById(coaching_id).populate(['appointments', 'offer', 'spent_credits', 'user', 'latest_appointments'])

  if (lodash.isEmpty(coaching.appointments)) {
    coaching.status=COACHING_STATUS_NOT_STARTED
  }
  // Started it 1 appointment
  if (coaching.status==COACHING_STATUS_NOT_STARTED && coaching.appointments.length>0) {
    coaching.status=COACHING_STATUS_STARTED
    // Set progress quizz
    const progressTemplate=await Quizz.findOne({ type: QUIZZ_TYPE_PROGRESS }).populate('questions')
    const progressUser = await progressTemplate.cloneAsUserQuizz()
    coaching.progress = progressUser._id
    // TODO coaching set assessment quizz
    const assessmentTemplate=await Quizz.findById(coaching.offer.assessment_quizz).populate('questions')
    const assessmentUser=await assessmentTemplate.cloneAsUserQuizz()
    coaching.assessment_quizz = assessmentUser._id
    // Set offer
    const company=await Company.findById(coaching.user.company).populate('offers')
    coaching.offer=company.offers?.[0]
  }

  // Finished if no more credit
  if (coaching.remaining_credits===0) {
    coaching.status=COACHING_STATUS_FINISHED
    // TODO coaching set impact quizz if exists in offer
  }

  const latest_appointment=coaching.latest_appointments?.[0]
  if (latest_appointment) {
    // stopped or dropped if latest coaching was COACHING_END_DELAY months before
    if (moment().diff(latest_appointment.end_date, 'month')>=COACHING_END_DELAY) {
      // Latest appointment was a rabbit
      if (latest_appointment.validated===false) {
        coaching.status=COACHING_STATUS_DROPPED
      }
      // Latest appointment was a valid
      if (coaching.remaining_credits>0 && latest_appointment.validated===true) {
        coaching.status=COACHING_STATUS_STOPPED
      }
    }
  }

  // Save if modified
  if (coaching.isModified('status')) {
    return coaching.save()
  }
}

module.exports={
  updateCoachingStatus,
}