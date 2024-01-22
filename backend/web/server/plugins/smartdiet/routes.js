const express = require('express')
const moment = require('moment')
const passport = require('passport')
const { NotFoundError, BadRequestError } = require('../../utils/errors')
const User = require('../../models/User')
const { ROLE_CUSTOMER, ROLE_EXTERNAL_DIET } = require('./consts')
const { idEqual } = require('../../utils/database')
const Coaching = require('../../models/Coaching')
const Appointement = require('../../models/Appointment')
const router = express.Router()

router.get('/', (req, res) => {
  res.json('ok2')
})

router.post('/coaching', passport.authenticate('basic', {session: false}), async(req, res) => {
  const {patient_email, diet_email, coaching_date, assessment}=req.body
  const patient=await User.findOne({email: patient_email, role: ROLE_CUSTOMER})
    .populate([{path: 'company', populate: ['assessment_appointment_type', 'followup_appointment_type']}, 'coachings'])
  if (!patient) {throw new NotFoundError(`Email patient introuvable:${patient_email}`)}
  const diet=await User.findOne({email: diet_email, role: ROLE_EXTERNAL_DIET}).populate('customer_companies')
  if (!diet) {throw new NotFoundError(`Email diet introuvable:${diet_email}`)}
  if (!diet.customer_companies.find(c => idEqual(c._id, patient.company._id))) { 
    throw new BadRequestError(`Diet ${diet.email} does not deal with company ${patient.company?.name}`)
  }

  const coaching=patient.latest_coachings?.[0] || await Coaching.create({user: patient, diet})
  const appType=patient.company[assessment ? 'assessment_appointment_type' : 'followup_appointment_type']

  const appointment=await Appointement.create({
    coaching, 
    appointment_type: appType,
    start_date: moment(coaching_date),
    end_date: moment(coaching_date).add(appType.duration, 'minutes'),
  })
  return res.json(appointment._id)
})

module.exports = {
  router,
}
