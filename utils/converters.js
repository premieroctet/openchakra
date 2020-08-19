const { RRule, RRuleSet, rrulestr }=require('rrule')
const {ALL_SERVICES, generate_id} = require('./consts.js');
const moment=require('moment-timezone')
const EV_AVAIL_DAY_MAPPING='monday tuesday wednesday thursday friday saturday sunday'.split(' ');

const DAYS='Lu Ma Me Je Ve Sa Di'.split(' ');
const LONG_DAYS='lundis mardis mercredis jeudis vendredis samedis dimanches'.split(' ');

const TIMESLOTS = [
    '00h00 - 01h00',
    '01h00 - 02h00',
    '02h00 - 03h00',
    '03h00 - 04h00',
    '04h00 - 05h00',
    '05h00 - 06h00',
    '06h00 - 07h00',
    '07h00 - 08h00',
    '08h00 - 09h00',
    '09h00 - 10h00',
    '10h00 - 11h00',
    '11h00 - 12h00',
    '12h00 - 13h00',
    '13h00 - 14h00',
    '14h00 - 15h00',
    '15h00 - 16h00',
    '16h00 - 17h00',
    '17h00 - 18h00',
    '18h00 - 19h00',
    '19h00 - 20h00',
    '20h00 - 21h00',
    '21h00 - 22h00',
    '22h00 - 23h00',
    '23h00 - 00h00',
];

const DAY_MAPPING={
        'monday': RRule.MO,
        'tuesday': RRule.TU,
        'wednesday': RRule.WE,
        'thursday': RRule.TH,
        'friday': RRule.FR,
        'saturday': RRule.SA,
        'sunday': RRule.SU,
}

const addOneYear = dt => {
  let result=new Date(dt.setFullYear(dt.getFullYear()+1));
  return result;
}

const computeRecurrency = (period, event, dayOfWeek) => {
  if (period.active===false) {
    return [event];
  }

  let rec_end = period.month_end ? new Date(period.month_end): addOneYear(new Date(period.month_begin));

  const rule = new RRule({
    freq: RRule.WEEKLY,
    byweekday: [DAY_MAPPING[dayOfWeek]],
    dtstart: new Date(period.month_begin),
    until: rec_end,
  })
  let all_events=[]
  rule.all().forEach( dt => {
    let start = new Date(dt)
    start.setHours(event.start.getHours(), event.start.getMinutes(),0);
    let end = new Date(dt)
    end.setHours(event.end.getHours(), event.end.getMinutes(),0);
    let cp = {...event, start:start, end:end}
    all_events.push(cp)
  })
  return all_events;
}

const avail2event = availab => {
  let result=[];
  EV_AVAIL_DAY_MAPPING.forEach(day => {
    let evts = availab[day]['event'];
    evts.forEach(e => {
      let title = e.all_services ? "Disponible" : e.services.map( s => s.label).join('\n');
      let res= {
        _id : availab._id,
        title: title,
        start: new Date(e.begin),
        end: new Date(e.end),
      }
      let re = computeRecurrency(availab.period, res, day);
      result=result.concat(re);
    })
  })
  return result;
}

const availabilities2events= avails => {
  let totalresult = []
  avails.forEach( avail => totalresult=totalresult.concat(avail2event(avail)));
  return totalresult;
};


const eventUI2availability = event => {

  let avail = {_id: event._id==null ? generate_id() : event._id }

  let startDate=new Date(event.selectedDateStart);
  let endDate=new Date(event.selectedDateEnd);

  let recurrent = event.recurrDays.size > 0 && event.isExpanded;
  let selDay=(startDate.getDay()+6)%7;
  let all_services = event.servicesSelected.indexOf(ALL_SERVICES)>-1;
  let services=[]
  if (!all_services) {
    services=event.servicesSelected.map(s => ({ label:s[0], value:s[1]}));
  }

  const inner_event = { 'begin': startDate, 'end': endDate, services:services, all_services : all_services }
  EV_AVAIL_DAY_MAPPING.forEach( (item, index) => {
    let include = recurrent ? event.recurrDays.has(index) : index==selDay;
    avail[item] = include ? {'event':[inner_event]} : {'event': []};
  })
  if (recurrent) {
    avail['period']={active:true, month_begin: new Date(event.selectedDateStart), month_end: event.selectedDateEndRecu ? new Date(event.selectedDateEndRecu):null };
  }
  else {
    avail['period']={active:false, month_begin: null, month_end: null};
  }
  return avail;
};

const availability2eventUI = avail => {

  var eventUI = {
    _id : avail._id,
    selectedDateStart: null,
    selectedDateEnd: null,
    recurrDays: new Set(),
    isExpanded: avail['period'].active ? 'panel1' : false,
    servicesSelected: [ALL_SERVICES],
    selectedDateEndRecu: null,
  }

  if (avail['period'].active) {
    eventUI.isExpanded = 'panel1';
    eventUI.selectedDateEndRecu = avail.period.month_end;
  }
  else {
    eventUI.isExpanded = false;
  }

  EV_AVAIL_DAY_MAPPING.forEach((day, index) => {
    const ev = avail[day].event;
    if (ev.length >0) {
      if (eventUI.isExpanded) {
        eventUI.recurrDays.add(index);
      }
      eventUI.selectedDateStart=moment(ev[0].begin).toDate()
      eventUI.selectedDateEnd=moment(ev[0].end).toDate()
      eventUI.selectedTimeStart=moment(ev[0].begin).tz('Europe/Paris').format('HH:mm')
      eventUI.selectedTimeEnd=moment(ev[0].end).tz('Europe/Paris').format('HH:mm')
    }
  })

  return eventUI

};
const booking2event = booking => {
    let res= {
      _id : booking._id,
      title: booking.service,
      start: moment(booking.date_prestation_moment),
      // TODO : compute proper end date
      end: moment(booking.date_prestation_moment).add(1, "hours"),
    }
    return res
}

const bookings2events = bookings => {
  if (!bookings) return []
  const events = bookings.map( booking => booking2event(booking))
  return events
}

module.exports={availabilities2events, eventUI2availability, availability2eventUI,
   DAYS, LONG_DAYS, TIMESLOTS,
   bookings2events
};
