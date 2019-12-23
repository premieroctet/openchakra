import { RRule, RRuleSet, rrulestr } from 'rrule'
import {ALL_SERVICES} from './consts.js';

const EV_AVAIL_DAY_MAPPING='monday tuesday wednesday thursday friday saturday sunday'.split(' ');

const DAY_MAPPING={
        'monday': RRule.MO,
        'tuesday': RRule.TU,
        'wednesday': RRule.WE,
        'thursday': RRule.TH,
        'friday': RRule.FR,
        'saturday': RRule.SA,
        'sunday': RRule.SU,
}

const computeRecurrency = (period, event, dayOfWeek) => {
  if (period.active===false) {
    return [event];
  }
  const rule = new RRule({
    freq: RRule.WEEKLY,
    byweekday: [DAY_MAPPING[dayOfWeek]],
    dtstart: new Date(period.month_begin),
    until: new Date(period.month_end),
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
  console.log("Converting avail to event:"+JSON.stringify(availab));
  let result=[];
  "monday tuesday wednesday thursday friday saturday sunday".split(' ').forEach(day => {
    let evts = availab[day]['event'];
    evts.forEach(e => {
      let title = e.all_services ? "Tous services" : e.services.map( s => s.label).join('\n');
      let res= {
        id: e._id,
        title: title,
        start: new Date(e.begin),
        end: new Date(e.end),
      }
      let re = computeRecurrency(availab.period, res, day);
      result=result.concat(re);
    })
  })
  console.log("Converted avail "+JSON.stringify(availab)+" to events "+JSON.stringify(result));
  return result;
}

const availabilities2events= avails => {
  let totalresult = []
  console.log("Converting avails 2 events:"+JSON.stringify(avails));
  avails.forEach( avail => totalresult=totalresult.concat(avail2event(avail)));
  return totalresult;
};


const events2availabilities= event => {
 // console.log("Event:"+JSON.stringify(event, null, 2));
  let avail = {}

  let startDate=new Date(event.selectedDateStart);
  let endDate=new Date(event.selectedDateEnd);

  let recurrent = event.recurrDays.size > 0;
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
  avail['period']={active:false, month_begin: null, month_end: null};
  console.log("Generated availability:"+JSON.stringify(avail, null, 2));
  return avail;
};

export {availabilities2events, events2availabilities};
