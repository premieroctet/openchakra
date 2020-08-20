const { RRule, RRuleSet, rrulestr }=require('rrule');
const {ALL_SERVICES, generate_id}=require('./consts.js');
const isEmpty = require('../server/validation/is-empty');
var moment=require('moment-timezone')
const {extendMoment}=require('moment-range')
moment = extendMoment(moment);

const {eventUI2availability}=require('./converters');
const DAYS=['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const dayToNumber = (day) => {
  const index= DAYS.indexOf(day);
  if (index==-1) { console.error(`${day} not found in ${DAYS}`)}
  return index;
}

const numberToDay = (number) => {
  if (number<0 || number>=DAYS.length) {
    console.error(`${number} out of bounds of ${JSON.stringify(DAYS)}`);
  }
  return DAYS[number];
}

const isMomentInEvent = (m, serviceId, event, checkTimeOnly) => {
  if (!event.all_services && !event.services.map(s => s.value).includes(serviceId)) {
    return false;
  }

  const start=moment(event.begin);
  const end=moment(event.end);
  if (checkTimeOnly) {
    const eventStartTime=start.hour()*60+start.minutes();
    const eventEndTime=end.hour()*60+end.minutes();
    const momentTime=m.hour()*60+m.minutes();
    return (momentTime>=eventStartTime) && (momentTime<=eventEndTime);
  }
  else {
    return m.isAfter(start) && m.isBefore(end);
  }
}

const isMomentInAvail = (m, serviceId, avail) => {

  var period=false;
  // Check period
  if (avail.period && avail.period.active) {
    var period=true;
    const start=moment(avail.period.month_begin);
    const end=moment(avail.period.month_end);
    if (start.isValid() && m.isBefore(start, 'day')) { return false }
    if (end.isValid() && m.isAfter(end, 'day')) { return false }
  }

  // Check day
  const dayName=numberToDay(m.day());
  const events=avail[dayName]?avail[dayName].event:null;
  if (isEmpty(events)) {
    return false;
  }
  // Test event. If in period, check only time
  const res= events.some( e => isMomentInEvent(m, serviceId, e, period));
  if (res) {
    console.log(`Moment ${m} in ${JSON.stringify(avail._id)}`)
  }
  return res
}

const isMomentAvailable = (mom, serviceId, avails) => {
  var res=false
  if (isEmpty(avails)) {
    res=true
  }
  else {
    res= avails.some(a => isMomentInAvail(mom, serviceId, a));
  }
  return res;
}

const isIntervalAvailable = (start, end, serviceId, avails) => {
  if (isEmpty(avails)) {
    return true;
  }
  var m=start;
  while (start.isBefore(end)) {
    if (isMomentAvailable(m, serviceId, avails)) {
      return true
    };
    m.add(15, 'minutes');
  }
  return false;
}

const getDeadLine=(deadline) => {
  var m=moment();
  if (!deadline) {
    return m;
  }
  const dl=deadline.split(" ");
  var value=parseInt(dl[0]);
  const unit=dl[1];

  switch (unit) {
    case 'heures':
      m.add(value, 'hours');
      break;
    case 'jours':
      m.add(value, 'days');
      break;
    case 'semaines':
      m.add(value*7, 'days');
      break;
    default:
      console.error('getDeadLine unité inconnue:'+unit);
  }
  return m;
}

const booking_datetime_str = booking => {
  return `Le ${booking.date_prestation} à ${moment(booking.time_prestation).tz('Europe/Paris').format('HH:mm')}`
}

const createDefaultAvailability = () => {


  var start=new Date()
  start=new Date(start.setHours(8))
  start=new Date(start.setMinutes(0))
  start=new Date(start.setSeconds(0))
  start=new Date(start.setMilliseconds(0))

  var end=new Date()
  end=new Date(end.setHours(19))
  end=new Date(end.setMinutes(0))
  end=new Date(end.setSeconds(0))
  end=new Date(end.setMilliseconds(0))

  var dt = new Date(end);
  dt.setMonth( dt.getMonth() + 6 );

  const eventUI={
    _id: generate_id(),
    isExpanded:'panel1',
    recurrDays:new Set([0,1,2,3,4,5]),
    selectedDateStart: start,
    selectedDateEnd: end,
    selectedTimeStart: start.toLocaleTimeString("fr-FR", {hour12: false}).slice(0, 5),
    selectedTimeEnd: end.toLocaleTimeString("fr-FR", {hour12: false}).slice(0, 5),
    servicesSelected: [ALL_SERVICES],
    selectedDateEndRecu: dt,
  };

  const avail=eventUI2availability(eventUI)

  return avail;
};

// Check if mmt's date is event
const eventIncludesDate = (event, mmt) => {
    return moment(event.begin).format('DD/MM/YYYY')==mmt.format('DD/MM/YYYY')
}

const availIncludesDate = (avail, mmt) => {
  
    const day_attrib=numberToDay(mmt.day())

    // Check day
    const hasEvents=avail[day_attrib] && avail[day_attrib].event && avail[day_attrib].event.length>0

    if (!hasEvents) {
      return false
    }
    // Check if event in period
    const hasPeriod=avail.period && avail.period.active
    if (hasPeriod) {
      var range=moment.range(avail.period.month_begin, avail.period.month_end)
      range = range.snapTo('day')
      if (!range.contains(mmt)) {
        return false
      }
    }
    else {
      if (!avail[day_attrib].event.some( event => eventIncludesDate(event, mmt))) {
        return false
      }
    }
    return true
}

/** Moment mmt's date is available for alfred_id => true/false */
const isDateAvailable = (mmt, availabilities) => {
  if (!availabilities || availabilities.length==0) {
    return true
  }
  return availabilities.some( avail => availIncludesDate(avail, mmt));
}

/** Moment mmt's date contains at least one event for alfred_id => true/false */
const hasAlfredDateBooking = (mmt, bookings) => {
  return true
}

module.exports={isMomentAvailable, isIntervalAvailable, getDeadLine, booking_datetime_str,
  createDefaultAvailability, isDateAvailable, hasAlfredDateBooking};
