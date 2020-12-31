'''
Created on 5 mars 2020

@author: seb
'''
from alfred.fix.fix_base import FixBase
import sys
from alfred.misc.utils import DAYS
from datetime import date, timedelta, datetime
from dateutil import parser
from alfred.misc.utils import get_item
from alfred.misc.consts import AttributeDict
from pytz import reference

class AvailabilitiesUpdate(FixBase):
    
    def extract_days(self, avail):
      days=[]
      for idx, d in enumerate(DAYS):
        if avail[d] and avail[d]['event'] and len(avail[d]['event'])>0:
          days.append(idx)  
      return days
    
    def get_period(self, avail):
      if  not avail['period']['active']:
        return None
      print(avail.period)
      begin = avail['period']['month_begin'].replace(hour=0, minute=0, second=0)
      end = (avail['period']['month_end'] or begin.replace(year=begin.year+1)).replace(hour=0, minute=0, second=0)
      return {
        'begin': begin,
        'end': end,
        'days': self.extract_days(avail)
        }

    def get_punctuals(self, avail):
      if  avail['period']['active']:
        return None
      localtime = reference.LocalTimezone()
      punctuals=set()
      for d in DAYS:
        events=avail[d]['event']
        for ev in events:
          dateStart, dateEnd = map(lambda d : d.astimezone(localtime), map(parser.isoparse, (ev['begin'], ev['end'])))
          punctuals.add(dateStart)
      return list(sorted(punctuals))

    def get_timelapses(self, avail):
      timelapses=set()
      localtime = reference.LocalTimezone()
      for d in DAYS:
        events = avail[d]['event']
        for ev in events:
          dateStart, dateEnd = map(lambda d : d.astimezone(localtime), map(parser.isoparse, (ev['begin'], ev['end'])))
          if dateStart.date()!=dateEnd.date():
            dateEnd = dateEnd.replace(year=dateStart.year, month=dateStart.month, day=dateStart.day)
            #print(dateStart, dateEnd)
          startHour, endHour = dateStart.hour, dateEnd.hour
          if (endHour<startHour):
            endHour=24
          if startHour==endHour:
            startHour, endHour = 8, 19 
          timelapses.update(range(startHour, endHour))
      return sorted(timelapses)
      
    def update(self):
      users = self.db.get_items("users")
      avails = self.db.get_items("availabilities")
      
      for idx, a in enumerate(avails):
        print("{}/{}:{}".format(idx, len(avails), a._id))
        
        punctuals=self.get_punctuals(a)
        
        nb= len(punctuals) if punctuals else 1
        
        for idx in range(nb):
          print("Punctual:{} ({})".format(punctuals!=None, nb))
          
          new_avail=AttributeDict()
          new_avail.available = True
          new_avail.user = a.user
          
          new_avail.period = self.get_period(a)
          new_avail.timelapses = self.get_timelapses(a)
          new_avail.punctual = punctuals[idx] if punctuals else None
          
          print(a)
          print(new_avail)
        
          self.db.insert_document("availabilities", new_avail)
        
        self.db.remove_document("availabilities", a._id)
    
if __name__ == '__main__':
    a = AvailabilitiesUpdate(sys.argv[1])
    a.update()
    
  
