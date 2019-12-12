import { RRule, RRuleSet, rrulestr } from 'rrule'

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
  console.log("ComputeRecurrency:"+JSON.stringify([period, event, dayOfWeek]));
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
    console.log('Added event:'+JSON.stringify(cp));
  })
  return all_events;
}

const avail2event = availab => {
  let result=[];
  "monday tuesday wednesday thursday friday saturday sunday".split(' ').forEach(day => {
    let evts = availab[day]['event'];
    console.log("evts:"+JSON.stringify(evts));
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
  console.log("Returning "+JSON.stringify(result));
  return result;
}

const availabilities2events= avails => {
  let totalresult = []
  console.log("Availabilities:"+JSON.stringify(avails));
  avails.forEach( avail => totalresult=totalresult.concat(avail2event(avail)));
  console.log("Computing returning events "+JSON.stringify(totalresult));
  return totalresult;
};

export default availabilities2events;
