const lodash=require('lodash')
const moment=require('moment')
const NodeCache=require('node-cache')
const { ForbiddenError } = require("../../utils/errors")
const { ROLE_EXTERNAL_DIET, APPOINTMENT_TYPE, APPOINTMENT_TYPE_ASSESSMENT, APPOINTMENT_TYPE_FOLLOWUP, APPOINTMENT_TYPE_NUTRITION } = require("./consts")
const Appointment = require("../../models/Appointment")
const Coaching = require("../../models/Coaching")
const NutritionAdvice = require("../../models/NutritionAdvice")
const PriceList = require("../../models/PriceList")
const { getDateFilter, getMonthFilter } = require('../../utils/database')
const Company = require('../../models/Company')

// Keep app types for 30 seconds only to manage company changes
const appTypes=new NodeCache({stdTTL: 60})

const getAppointmentType = async ({appointmentType}) => {
  const key=appointmentType.toString()
  let result=appTypes.get(key)
  if (result) {
    return result
  }
  const assessment=await Company.exists({assessment_appointment_type: appointmentType})
  result=assessment ? APPOINTMENT_TYPE_ASSESSMENT : APPOINTMENT_TYPE_FOLLOWUP
  appTypes.set(key, result)
  return result
}

const getPrices = async () => {
  return await PriceList.find().sort({date: 1})
}

const PRICES_MAPPING={
  [APPOINTMENT_TYPE_ASSESSMENT]: 'assessment',
  [APPOINTMENT_TYPE_FOLLOWUP]: 'followup',
  [APPOINTMENT_TYPE_NUTRITION]: 'nutrition',
}

const getAppointmentPrice = ({pricesList, appointment}) => {
  const prices=lodash(pricesList).filter(p => moment(p.date).isBefore(appointment.start_date)).maxBy('date')
  return prices?.[PRICES_MAPPING[appointment.type]]||undefined
}

const computeBilling = async ({diet, fields, params}) => {
  if (diet.role!=ROLE_EXTERNAL_DIET) {
    throw new ForbiddenError(`La facturation n'est accessible qu'aux diets`)
  }
  const prices=await getPrices()
  const appointments=await Appointment.find({diet}, {start_date:1}).catch(console.error)
  const nutAdvices=await Coaching.find({diet}, {start_date:1}).populate('nutrition_advices')
  const minDate=lodash.minBy([...appointments, ...nutAdvices], obj => obj.start_date)?.start_date

  if (!minDate) {
    return ({model: 'billing', data:[]})
  }
  const maxDate=moment()
  const length=parseInt(params.limit) || Number.MAX_SAFE_INTEGER
  const skip=parseInt(params.page)*length || 0
  const step=params['sort.month']=='desc' ? -1 : 1
  let start=step==1 ? minDate : maxDate
  // If skip
  if (skip) {
    start=moment(start).add(skip*step, 'month')
  }
  const dates=lodash.range(length+1).map(idx => moment(start).add(step*idx, 'month'))
  let data=[]

  for (const currentDate of dates) {
    const current={month: moment(currentDate)}
    const monthFilter=getMonthFilter({attribute: 'start_date', month:currentDate})
    const appts=await Appointment.find({...monthFilter, validated: true, diet}, {appointment_type:1, start_date:1})
    const types=await Promise.all(appts.map(a => getAppointmentType({appointmentType: a.appointment_type})))
    let typedAppts=appts.map((a, idx) => ({...a, type:types[idx]}))
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
    current.impact_count=0
    current.impact_total=0
    current.total=current.assessment_total+current.followup_total+current.nutrition_total+current.impact_total
    data.push(current)
  }
  return ({model: 'billing', data})
}

module.exports={
  computeBilling,
}