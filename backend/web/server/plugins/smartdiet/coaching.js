const { COACHING_STATUS_NOT_STARTED, COACHING_STATUS_STARTED, COACHING_STATUS_FINISHED, COACHING_END_DELAY, COACHING_STATUS_DROPPED, COACHING_STATUS_STOPPED } = require("./consts")
const CoachingSchema = require("./schemas/CoachingSchema")

const updateCoachingStatus = async coaching_id => {
  const coaching=await Coaching.findById(coaching_id).populate(['appointments', 'offer', 'spent_credits', 'user', 'latest_appointments'])

  // Started it 1 appointment
  if (coaching.status==COACHING_STATUS_NOT_STARTED && coaching.appointements.length>0) {
    coaching.status=COACHING_STATUS_STARTED
    // TODO coaching set progress quizz
    // TODO coaching set assessment quizz
  }

  // Finished if no more credit
  if (coaching.remaining_credits==0) {
    coaching.status=COACHING_STATUS_FINISHED
    // TODO coaching set impact quizz if exists in offer
  }

  const latest_appointment=coaching.latest_appointments?.[0]
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

  // Save if modified
  if (coaching.isModified('status')) {
    return coaching.save()
  }
}

module.exports={
  updateCoachingStatus,
}