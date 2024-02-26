const lodash=require('lodash')
const moment=require('moment')
const { ForbiddenError } = require("../../utils/errors")
const { ROLE_EXTERNAL_DIET, APPOINTMENT_TYPE, APPOINTMENT_TYPE_ASSESSMENT, APPOINTMENT_TYPE_FOLLOWUP, APPOINTMENT_TYPE_NUTRITION, APPOINTMENT_TYPE_IMPACT } = require("./consts")
const Appointment = require("../../models/Appointment")
const Coaching = require("../../models/Coaching")
const NutritionAdvice = require("../../models/NutritionAdvice")
const PriceList = require("../../models/PriceList")
const { getDateFilter, getMonthFilter } = require('../../utils/database')
const Company = require('../../models/Company')


const getPrices = async () => {
  return await PriceList.find().sort({date: 1})
}

const PRICES_MAPPING={
  [APPOINTMENT_TYPE_ASSESSMENT]: 'assessment',
  [APPOINTMENT_TYPE_FOLLOWUP]: 'followup',
  [APPOINTMENT_TYPE_NUTRITION]: 'nutrition',
  [APPOINTMENT_TYPE_IMPACT]: 'impact',
}

const getAppointmentPrice = ({pricesList, appointment}) => {
  const prices=lodash(pricesList).filter(p => moment(p.date).isBefore(appointment.start_date)).maxBy('date')
  return prices?.[PRICES_MAPPING[appointment.type]]||undefined
}

const getAppointmentType = async ({appointment}) => {
  const assessment=await Company.exists({assessment_appointment_type: appointment.appointment_type})
  const impact=await Company.exists({impact_appointment_type: appointment.appointment_type})
  return assessment ? APPOINTMENT_TYPE_ASSESSMENT : impact ? APPOINTMENT_TYPE_IMPACT : APPOINTMENT_TYPE_FOLLOWUP
}

const computeBilling = async ({diet, fields}) => {
  if (diet.role!=ROLE_EXTERNAL_DIET) {
    throw new ForbiddenError(`La facturation n'est accessible qu'aux diets`)
  }
  const prices=await getPrices()
  const appointments=await Appointment.find({diet}).catch(console.error)
  const nutAdvices=await Coaching.find({diet}).populate('nutrition_advices')
  const startDate=lodash.minBy([...appointments, ...nutAdvices], obj => obj.start_date)?.start_date
  let data=[]
  if (!startDate) {
    return ({model: 'billing', data})
  }
  let currentDate=moment(startDate).startOf('month')
  const endDate=moment().endOf('month').add(1, 'month)')
  while (currentDate.isBefore(endDate)) {
    const current={month: moment(currentDate)}
    const monthFilter=getMonthFilter({attribute: 'start_date', month:currentDate})
    const appts=await Appointment.find({...monthFilter, diet}, {appointment_type:1, start_date:1})
    const types=await Promise.all(appts.map(a => getAppointmentType({appointment: a})))
    let typedAppts=appts.map((a, idx) => ({...a.toObject(), type:types[idx]}))
    const nutCoachings=await Coaching.find({diet}).populate({path: 'nutrition_advices', match: monthFilter})
    typedAppts=[...typedAppts, ...lodash.flatten(nutCoachings.map(n => n.nutrition_advices)).map(n => ({...n.toObject(), type: APPOINTMENT_TYPE_NUTRITION}))]
    typedAppts=typedAppts.map(appt => ({...appt, price:getAppointmentPrice({pricesList: prices, appointment:appt})}))

    const grouped=lodash.groupBy(typedAppts, 'type')
    current.assessment_count=grouped[APPOINTMENT_TYPE_ASSESSMENT]?.length || 0
    current.assessment_total=lodash(grouped[APPOINTMENT_TYPE_ASSESSMENT]||[]).sumBy('price')
    current.followup_count=grouped[APPOINTMENT_TYPE_FOLLOWUP]?.length || 0
    current.followup_total=lodash(grouped[APPOINTMENT_TYPE_FOLLOWUP]||[]).sumBy('price')
    current.nutrition_count=grouped[APPOINTMENT_TYPE_NUTRITION]?.length || 0
    current.nutrition_total=lodash(grouped[APPOINTMENT_TYPE_NUTRITION]||[]).sumBy('price')
    current.impact_count=grouped[APPOINTMENT_TYPE_IMPACT]?.length || 0
    current.impact_total=lodash(grouped[APPOINTMENT_TYPE_IMPACT]||[]).sumBy('price')
    current.total=current.assessment_total+current.followup_total+current.nutrition_total+current.impact_total
    data.push(current)
    currentDate.add(1, 'month')
  }
  return ({model: 'billing', data})
}

module.exports={
  computeBilling,
}