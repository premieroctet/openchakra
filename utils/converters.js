import { RRule, RRuleSet, rrulestr } from 'rrule'

const AVAIL={
	"period" : { "active" : false, "month_begin" : null, "month_end" : null },
	"monday" : {
		"event" : [ { "all_services" : true, "begin" : "2019-11-27T09:00:00.257Z", "end" : "2019-11-27T11:00:00.257Z", "services" : [ ] } ] },
	"tuesday" : { "event" : [ { "all_services" : true, "begin" : "2019-10-30T07:00:00.257Z", "end" : "2019-10-30T10:00:00.257Z", "services" : [ ] } ] },
	"wednesday" : { "event" : [ ] },
	"thursday" : { "event" : [ ] },
	"friday" : { "event" : [ ] },
	"saturday" : { "event" : [ ] },
	"sunday" : { "event" : [ ] },
}

const EV_AVAIL_DAY_MAPPING={
  'isDateActiveLu': 'monday',
  'isDateActiveMa': 'tuesday',
  'isDateActiveMe': 'wednesday',
  'isDateActiveJe': 'thursday',
  'isDateActiveVe': 'friday',
  'isDateActiveSa': 'saturday',
  'isDateActiveDi': 'sunday',
}

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
  return result;
}

const availabilities2events= avails => {
  let totalresult = []
  avails.forEach( avail => totalresult=totalresult.concat(avail2event(avail)));
  return totalresult;
};


const events2availabilities= event => {
  console.log("Received event:"+JSON.stringify(event, null, 2));
  let avail = {}
  let startDate=new Date(event.selectedDateStart);
  let endDate=new Date(event.selectedDateEnd);
  let recurrent = event.isExpanded!==false;
  const inner_event = { 'begin': startDate, 'end': endDate, all_services : true }
  Object.entries(EV_AVAIL_DAY_MAPPING).forEach( item => {
    console.log(item);
    console.log(event[item[0]]);
    if (event[item[0]]=='secondary') {
      avail[item[1]]={'event':[inner_event]};
    }
  })  
  console.log("Generated availability:"+JSON.stringify(avail)); 
};

export {availabilities2events, events2availabilities};
