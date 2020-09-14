'''
Created on 5 mars 2020

@author: seb
'''
import sys
from datetime import datetime
from dateutil.relativedelta import relativedelta
import tzlocal
import pytz
from alfred.fix.fix_base import FixBase

class FixAddAvailabilities(FixBase):

    def create_default_availability(self, user_id):
      tz = tzlocal.get_localzone()
      utc = pytz.utc 
      startevent=datetime.now().replace(hour=8, minute=0, second=0, microsecond=0)
      startevent = tz.localize(startevent).astimezone(utc)
      endevent=datetime.now().replace(hour=19, minute=0, second=0, microsecond=0)
      endevent = tz.localize(endevent).astimezone(utc)
      #event={'all_services': True, 'begin': '2020-05-13T06:00:00.000Z', 'end': '2020-05-13T17:00:00.000Z', 'services': []}
      event={
        'all_services': True, 
        'begin': startevent.isoformat(timespec='milliseconds').replace('+00:00', 'Z'), 
        'end': endevent.isoformat(timespec='milliseconds').replace('+00:00', 'Z'),
        'services': []}
      avail={
        'user': user_id,
        'monday': {'event': [event]},
        'tuesday': {'event': [event]},
        'wednesday': {'event': [event]},
        'thursday': {'event': [event]},
        'friday': {'event': [event]},
        'saturday': {'event': [event]},
        'sunday': {'event': []},
        'period': {
          'active': True,
          'month_begin': startevent,
          'month_end': endevent+relativedelta(months=+6)
          }
        }

      return avail
      
    def get_max_date(self, avails):
      max_dt=datetime(1900, 1, 1)
      for a in avails:
        for (k,v) in a.items():
          if hasattr(v, 'keys') and 'event' in v.keys():
            events=v['event']
            for e in events:
              dt=datetime.strptime(e['begin'], '%Y-%m-%dT%H:%M:%S.%fZ')
              max_dt=max(dt, max_dt)
        if a.period['active']:
          dt = a.period['month_end'] or a.period['month_begin']+relativedelta(month=6)
          max_dt=max(max_dt, dt)
      return max_dt
              
    def fix(self):
      users = self.db.get_items("users")
      all_avails = self.db.get_items("availabilities")
      for u in (i for i in users if i.is_alfred):
        avails=[a for a in all_avails if a.user==u._id]
        dt=self.get_max_date(avails)
        if dt<datetime.now():
          print("Ajout automatique de dispo pour {} {} {}:{}".format(u.firstname, u.name, u.email, dt))
          avail=self.create_default_availability(u._id)
          self.db.insert_document("availabilities", avail)
          
    
if __name__ == '__main__':
    FixAddAvailabilities(sys.argv[1]).fix()