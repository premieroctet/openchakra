const moment=require('moment')
const lodash=require('lodash')
const Coaching = require("../../models/Coaching")
require("../../models/Appointment")
const Company = require("../../models/Company")
const Quizz = require("../../models/Quizz")
const { COACHING_STATUS_NOT_STARTED, COACHING_STATUS_STARTED, COACHING_STATUS_FINISHED, COACHING_END_DELAY, COACHING_STATUS_DROPPED, 
  COACHING_STATUS_STOPPED, QUIZZ_TYPE_PROGRESS
} = require("./consts")

let progressTemplate=null
let assessmentTemplate=null

const updateCoachingStatus = async coaching_id => {

  const coaching=await Coaching.findById(coaching_id).populate(['_last_appointment', 'offer', 'spent_credits'])

  if (!coaching._last_appointment) {
    coaching.status=COACHING_STATUS_NOT_STARTED
  }
  // Started it 1 appointment
  if (coaching.status==COACHING_STATUS_NOT_STARTED && !!coaching._last_appointment) {
    coaching.status=COACHING_STATUS_STARTED
    // Set progress quizz
    if (!coaching.progress) {
      if (!progressTemplate) {
        progressTemplate=await Quizz.findOne({ type: QUIZZ_TYPE_PROGRESS }).populate('questions')
      }
      if (!progressTemplate) {
        throw new Error('No progress template')
      }
      const progressUser = await progressTemplate.cloneAsUserQuizz()
     coaching.progress = progressUser._id
    }
    // TODO coaching set assessment quizz
    if (!coaching.assessment_quizz) {
      if (!assessmentTemplate) {
        assessmentTemplate=await Quizz.findById(coaching.offer.assessment_quizz).populate('questions')
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

  const last_appointment=coaching._last_appointment
  if (last_appointment) {
    const creditsRemain=coaching.remaining_credits>0
    const afterDelay=moment().diff(last_appointment?.end_date, 'month')>=COACHING_END_DELAY
    const lastValidated=last_appointment.validated==true

    if (!lastValidated && (afterDelay || !creditsRemain)) {
      coaching.status=COACHING_STATUS_DROPPED
    }
    if (lastValidated && afterDelay && creditsRemain) {
      coaching.status=COACHING_STATUS_STOPPED
    }
    if (!creditsRemain && lastValidated && moment().isAfter(last_appointment.end_date)) {
      coaching.status=COACHING_STATUS_FINISHED
    }
  }

  if (coaching.status!=COACHING_STATUS_NOT_STARTED && !coaching.progress) {
    console.error(`pb on coaching ${coaching._id}`)
    throw new Error(`pb on coaching ${coaching._id}`)
  }


  // Save if modified
  // console.log('Coaching', coaching._id, 'status', orgStatus, '=>', coaching.status)
  const res=coaching.save()
  return res
}

module.exports={
  updateCoachingStatus,
}