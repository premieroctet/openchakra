const {RRule, RRuleSet, rrulestr} = require('rrule');
const {ALL_SERVICES, generate_id} = require('./consts.js');
const isEmpty = require('../server/validation/is-empty');
var moment = require('moment-timezone');
const {extendMoment} = require('moment-range');
moment = extendMoment(moment);

const {eventUI2availability} = require('./converters');
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const dayToNumber = (day) => {
  const index = DAYS.indexOf(day);
  if (index == -1) {
    console.error(`${day} not found in ${DAYS}`);
  }
  return index;
};

const numberToDay = (number) => {
  if (number < 0 || number >= DAYS.length) {
    console.error(`${number} out of bounds of ${JSON.stringify(DAYS)}`);
  }
  return DAYS[number];
};

const isMomentInEvent = (m, serviceId, event, checkTimeOnly) => {
  if (!event.all_services && !event.services.map(s => s.value).includes(serviceId)) {
    return false;
  }

  const start = moment(event.begin);
  const end = moment(event.end);
  if (checkTimeOnly) {
    const eventStartTime = start.hour() * 60 + start.minutes();
    const eventEndTime = end.hour() * 60 + end.minutes();
    const momentTime = m.hour() * 60 + m.minutes();
    return (momentTime >= eventStartTime) && (momentTime <= eventEndTime);
  } else {
    return m.isAfter(start) && m.isBefore(end);
  }
};

const isMomentInAvail = (m, serviceId, avail) => {

  var period = false;
  // Check period
  if (avail.period && avail.period.active) {
    var period = true;
    const start = moment(avail.period.month_begin);
    const end = moment(avail.period.month_end);
    if (start.isValid() && m.isBefore(start, 'day')) {
      return false;
    }
    if (end.isValid() && m.isAfter(end, 'day')) {
      return false;
    }
  }

  // Check day
  const dayName = numberToDay(m.day());
  const events = avail[dayName] ? avail[dayName].event : null;
  if (isEmpty(events)) {
    return false;
  }
  // Test event. If in period, check only time
  const res = events.some(e => isMomentInEvent(m, serviceId, e, period));
  if (res) {
    console.log(`Moment ${m} in ${JSON.stringify(avail._id)}`);
  }
  return res;
};

const isMomentAvailable = (mom, avails) => {
  const availability=getAvailabilityForDate(mom, avails)
  if (!availability || !availability.available) {
    return false
  }
  // Date is ok, check timelapses
  return availability.timelapses.includes(mom.hour())
};

const isIntervalAvailable = (start, end, serviceId, avails) => {
  if (isEmpty(avails)) {
    return true;
  }
  var m = start;
  while (start.isBefore(end)) {
    if (isMomentAvailable(m, avails)) {
      return true;
    }
    ;
    m.add(30, 'minutes');
  }
  return false;
};

const getDeadLine = (deadline) => {
  var m = moment();
  if (!deadline) {
    return m;
  }
  const dl = deadline.split(' ');
  var value = parseInt(dl[0]);
  const unit = dl[1];

  switch (unit) {
    case 'heures':
      m.add(value, 'hours');
      break;
    case 'jours':
      m.add(value, 'days');
      break;
    case 'semaines':
      m.add(value * 7, 'days');
      break;
    default:
      console.error('getDeadLine unité inconnue:' + unit);
  }
  return m;
};

const booking_datetime_str = booking => {
  return `Le ${booking.date_prestation} à ${moment(booking.time_prestation).tz('Europe/Paris').format('HH:mm')}`;
};

const createDefaultAvailability = () => {


  var start = new Date();
  start = new Date(start.setHours(8));
  start = new Date(start.setMinutes(0));
  start = new Date(start.setSeconds(0));
  start = new Date(start.setMilliseconds(0));

  var end = new Date();
  end = new Date(end.setHours(19));
  end = new Date(end.setMinutes(0));
  end = new Date(end.setSeconds(0));
  end = new Date(end.setMilliseconds(0));

  var dt = new Date(end);
  dt.setMonth(dt.getMonth() + 6);

  const eventUI = {
    _id: generate_id(),
    isExpanded: 'panel1',
    recurrDays: new Set([0, 1, 2, 3, 4, 5]),
    selectedDateStart: start,
    selectedDateEnd: end,
    selectedTimeStart: start.toLocaleTimeString('fr-FR', {hour12: false}).slice(0, 5),
    selectedTimeEnd: end.toLocaleTimeString('fr-FR', {hour12: false}).slice(0, 5),
    servicesSelected: [ALL_SERVICES],
    selectedDateEndRecu: dt,
  };

  const avail = eventUI2availability(eventUI);

  return avail;
};

// Check if mmt's date is event
const eventIncludesDate = (event, mmt) => {
  return moment(event.begin).format('DD/MM/YYYY') == mmt.format('DD/MM/YYYY');
};

const availIncludesDate = (avail, mmt) => {

  if (avail.is_punctual) {
    return [moment(avail.punctual).isSame(mmt, 'day'), avail.available]
  }
  else {
    var range=moment.range(avail.period.begin, avail.period.end)
    if (!range.snapTo('day').contains(mmt)) {
      return [false, false]
    }
    return [avail.period.days.includes(mmt.isoWeekday()-1), avail.available]
  }
};

// Sort availabilities : punctuals before recurrent, then by reverse id ( same order as creation date)
const availabilitiesComparator = (a1, a2) => {
  // Punctual vs recurrent : punctual first
  if (a1.is_punctual != a2.is_punctual) {
    return a1.is_punctual ? -1 : 1
  }
  return a2._id.toString().localeCompare(a1._id.toString())
}

const getAvailabilityForDate = (mmt, availabilities) => {
  if (!availabilities || availabilities.length==0) {
    return null
  }
  const availability = availabilities.sort(availabilitiesComparator).find( avail => availIncludesDate(avail, mmt)[0])
  return availability
}
/** Moment mmt's date is available for alfred_id => true/false */
const isDateAvailable = (mmt, availabilities) => {
  if (!availabilities || availabilities.length == 0) {
    return false;
  }
  const availability=getAvailabilityForDate(mmt, availabilities)
  return availability ? availability.available : false
}

/** Moment mmt's date contains at least one event for alfred_id => true/false */
const hasAlfredDateBooking = (mmt, bookings) => {
  return true;
};

/**
 Returns a timelapse containing true/false/null depending on input availabilities.
 For each timelapse, returns :
  - true if all input are true
  - false if all input are false
  - null if inputs differ
 */
const combineTimelapses = availabilities => {
  if (availabilities.length==0) {
    return Array.from({length:24}, () => false)
  }
  var timelapses = Array.from(Array(24).keys()).map( idx => availabilities[0].timelapses.includes(idx))
  availabilities.forEach( av => {
    timelapses.forEach( (value, idx) => {
      if (value!=av.timelapses.includes(idx)) {
        timelapses[idx]=null
      }
    })
  })
  return timelapses
}

module.exports = {
  isMomentAvailable, isIntervalAvailable, getDeadLine, booking_datetime_str,
  createDefaultAvailability, isDateAvailable, hasAlfredDateBooking, DAYS,
  getAvailabilityForDate, combineTimelapses
};
