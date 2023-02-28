let moment = require('moment-timezone')
const {extendMoment} = require('moment-range')
const isEmpty = require('../server/validation/is-empty')
const {MONTH_PERIOD} = require('./consts.js')
moment = extendMoment(moment)
moment.locale('fr')

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const isMomentAvailable = (mom, avails) => {

  if (!moment.isMoment(mom)) {
    return false
  }
  const availability=getAvailabilityForDate(mom, avails)
  if (!availability || !availability.available) {
    // 923772 : pas de dispos => toujours disponible
    return true
  }
  // Date is ok, check timelapses
  const res= availability.timelapses.includes(mom.hour())
  return res
}

const isIntervalAvailable = (start, end, serviceId, avails) => {
  if (!moment.isMoment(start)||!moment.isMoment(end)) {
    return false
  }

  if (isEmpty(avails)) {
    return true
  }
  let m = start
  while (start.isBefore(end)) {
    if (isMomentAvailable(m, avails)) {
      return true
    }

    m.add(30, 'minutes')
  }
  return false
}

const getDeadLine = deadline => {
  let m = moment()
  if (!deadline) {
    return m
  }
  const dl = deadline.split(' ')
  let value = parseInt(dl[0])
  const unit = dl[1]

  switch (unit) {
    case 'heures':
      m.add(value, 'hours')
      break
    case 'jours':
      m.add(value, 'days')
      break
    case 'semaines':
      m.add(value * 7, 'days')
      break
    default:
      console.error(`getDeadLine unité inconnue:${ unit}`)
  }
  return m
}

const datetime_str = datetime => {
  return `${moment(datetime).format('LLLL')}`
}

const date_str = datetime => {
  return `${moment(datetime).format('L')}`
}

const booking_datetime_str = booking => {
  return datetime_str(booking.prestation_date)
}

const booking_date_str = booking => {
  return date_str(booking.prestation_date)
}

const getDefaultAvailability = () => {

  let start = moment().set({hour: 1, minute: 0, second: 0})
  let end = moment(start).add(6, 'month')


  return {
    period: {
      days: [0, 1, 2, 3, 4, 5],
      begin: start,
      end: end,
    },
    timelapses: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    available: true,
    punctual: null,
  }
}

const availIncludesDate = (avail, mmt) => {

  if (avail.is_punctual) {
    return moment(avail.punctual).isSame(mmt, 'day')
  }

  let range=moment.range(avail.period.begin, avail.period.end)
  if (!range.snapTo('day').contains(mmt)) {
    return false
  }
  return avail.period.days.includes(mmt.isoWeekday() - 1)

}

const getAvailabilityForDate = (mmt, availabilities) => {
  if (!availabilities || availabilities.length==0) {
    return null
  }
  return availabilities.find(avail => availIncludesDate(avail, mmt))
}
/** Moment mmt's date is available for alfred_id => true/false */
const isDateAvailable = (mmt, availabilities) => {
  if (!moment.isMoment(mmt)) {
    console.error(`Objet moment attendu: ${JSON.stringify(mmt)}`)
    return false
  }
  if (!availabilities || availabilities.length == 0) {
    // 923772 : pas de dispos => toujours disponible
    return true
  }
  const availability=getAvailabilityForDate(mmt, availabilities)
  return availability ? availability.available : false
}

/** Moment mmt's date contains at least one event for alfred_id => true/false */
const hasAlfredDateBooking = (mmt, bookings) => {
  return true
}

/**
 Returns a timelapse containing true/false/null depending on input availabilities.
 For each timelapse, returns :
  - true if all input are true
  - false if all input are false
  - null if inputs differ
 */
const combineTimelapses = availabilities => {
  if (availabilities.length==0) {
    return Array.from({length: 24}, () => false)
  }
  let timelapses = Array.from(Array(24).keys()).map(idx => availabilities[0].timelapses.includes(idx))
  availabilities.forEach(av => {
    timelapses.forEach((value, idx) => {
      if (value!=av.timelapses.includes(idx)) {
        timelapses[idx]=null
      }
    })
  })
  return timelapses
}

// Converts [1,2,5] => [false, true, true, false, false, true, false...]
const timelapsesSetToArray = timelapses => {
  return Array.from({length: 24}, (v, idx) => timelapses.includes(idx))
}

const getPeriodStart = period => {
  return moment().startOf(period == MONTH_PERIOD ? 'month' : 'year')
}

const getExcludedDays = availabilities => {
  const date=moment(new Date())
  let currMoment=moment(date).set('date', 1)
  const endMoment=moment(date).add(1, 'year')
  let exclude=[]
  while (currMoment<endMoment) {
    if (!isDateAvailable(currMoment, availabilities)) {
      exclude.push(currMoment.toDate())
    }
    currMoment.add(1, 'd')
  }
  return exclude
}

const getExcludedTimes = (bookingDate, availabilities) => {
  let currMoment=moment(bookingDate || new Date()).set({hour: 0, minute: 0})
  let exclude=[]
  while (currMoment.hour()!=23 || currMoment.minute()!=30) {
    if (!isMomentAvailable(currMoment, availabilities)) {
      exclude.push(currMoment.toDate())
    }
    currMoment.add(30, 'minutes')
  }
  return exclude
}

module.exports = {
  isMomentAvailable, isIntervalAvailable, getDeadLine, booking_datetime_str,
  getDefaultAvailability, isDateAvailable, hasAlfredDateBooking, DAYS,
  getAvailabilityForDate, combineTimelapses, timelapsesSetToArray,
  getPeriodStart, getExcludedDays, getExcludedTimes,
  booking_date_str,
  datetime_str, date_str,
}
