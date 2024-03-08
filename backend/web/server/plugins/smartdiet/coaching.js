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

  const orgStatus=coaching.status

  if (lodash.isEmpty(coaching.appointments)) {
    coaching.status=COACHING_STATUS_NOT_STARTED
  }
  // Started it 1 appointment
  if (coaching.status==COACHING_STATUS_NOT_STARTED && coaching.appointments.length>0) {
    coaching.status=COACHING_STATUS_STARTED
    // Set progress quizz
    if (!coaching.progress) {
      const progressTemplate=await Quizz.findOne({ type: QUIZZ_TYPE_PROGRESS }).populate('questions')
      if (!progressTemplate) {
        throw new Error('No progress template')
      }
      const progressUser = await progressTemplate.cloneAsUserQuizz()
      coaching.progress = progressUser._id
    }
    // TODO coaching set assessment quizz
    if (!coaching.assessment_quizz) {
      const assessmentTemplate=await Quizz.findById(coaching.offer.assessment_quizz).populate('questions')
      if (!assessmentTemplate) {
        throw new Error('No assessment template for', coaching.offer)
      }
      const assessmentUser=await assessmentTemplate.cloneAsUserQuizz()
      coaching.assessment_quizz = assessmentUser._id
    }
    // Set offer
    if (!coaching.offer) {
      const company=await Company.findById(coaching.user.company).populate('offers')
      coaching.offer=company.offers?.[0]
    }
  }

  const latest_appointment=coaching.latest_appointments?.[0]
  if (latest_appointment) {
    const creditsRemain=coaching.remaining_credits>0
    const afterDelay=moment().diff(latest_appointment?.end_date, 'month')>=COACHING_END_DELAY
    const lastValidated=latest_appointment?.validated==true

    if (!lastValidated && (afterDelay || !creditsRemain)) {
      coaching.status=COACHING_STATUS_DROPPED
    }
    if (lastValidated && afterDelay && creditsRemain) {
      coaching.status=COACHING_STATUS_STOPPED
    }
    if (!creditsRemain && lastValidated) {
      coaching.status=COACHING_STATUS_FINISHED
    }
  }

  // Save if modified
  if (coaching.isModified('status')) {
    console.log('Coaching', coaching._id, 'status', orgStatus, '=>', coaching.status)
    return coaching.save()
  }
}

module.exports={
  updateCoachingStatus,
}