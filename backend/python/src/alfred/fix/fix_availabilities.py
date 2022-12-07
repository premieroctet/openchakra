'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase
from _collections_abc import Iterable
from datetime import datetime
from pprint import pprint

class FixAvailabilities(FixBase):
  
  DATE_FORMAT='%Y-%m-%dT%H:%M:%S.%fZ'
  
  def get_yearmonthday(self, dt):
    return [getattr(dt, part) for part in 'year month day'.split()]
  
  def set_yearmonthday(self, dt, ymd):
    return dt.replace(*ymd)
    
  def fix(self):
    all_avails = self.db.get_items("availabilities")
    users = set()
    for avail in all_avails:
      events=[]
      for attname in avail:
        attr=getattr(avail, attname)
        if isinstance(attr, Iterable) and 'event' in attr:
          ev = attr['event']
          for e in ev:
            start, end = [datetime.strptime(e[i], self.DATE_FORMAT) if e[i] else None for i in 'begin end'.split()]
            if start and end:
              if end.date() != start.date():
                print(start, end)
                print(start.date(), end.date())
                if end.date() < start.date():
                  pass #e['end']=self.set_yearmonthday(end, self.get_yearmonthday(start)).strftime(self.DATE_FORMAT).replace('.000000', '.000')
                else:
                  events.append(e)
                
      if events:
        #print("Alfred:{}".format(avail.user))
        users.add(avail.user)
        #print(events)
        ranges=[]
        for e in events:
          begin, end = [datetime.strptime(e[i], self.DATE_FORMAT) if e[i] else None for i in 'begin end'.split()]          
          ranges.append((begin, end))
        if len(set(ranges))!=1:
          raise Exception()
        begin, end = ranges[0]
        ymd = self.get_yearmonthday(begin)
        for e in events:
          e['end']=self.set_yearmonthday(end, ymd).strftime(self.DATE_FORMAT).replace('.000000', '.000')
          pass
        #pprint(avail)
        avail.period['month_end']=end
        self.db.update_document("availabilities", avail)
     
    for u in users:
      print(u)
      pprint([a for a in all_avails if a.user==u]) 
                    
if __name__ == '__main__':
    FixAvailabilities(sys.argv[1]).fix()
    