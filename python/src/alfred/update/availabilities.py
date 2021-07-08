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
from pprint import pprint

class AvailabilitiesUpdate(FixBase):
    
    def add_default_availability(self, alfred):
      DEFAULT= {
         'period': {
           'begin': datetime.now(),
           'end': datetime.now()+timedelta(days=365),
           'days': list(range(6)),
        },
        'punctual': None,
        'available': True,
        'user': alfred._id,
        'timelapses': [9, 10, 11, 12, 13, 14, 15, 16, 17],
      }
      self.db.insert_document("availabilities", DEFAULT)
      
    def update(self):
      now=datetime.now()
      alfreds = self.db.get_items("users", {'is_alfred' : True}, exclude_fields=['birthday'])
      all_avails = self.db.get_items("availabilities")
      
      print('{} alfreds'.format(len(alfreds)))
      
      for alfred in alfreds:
        avails=[a for a in all_avails if a.user==alfred._id]
        after_today_avail=[a for a in avails if 'period' in a and a.period and 'end' in a.period and a.period['end']>now]
        if len(after_today_avail)==0:
          print("Pas de dispo après aujourd'hui:{} {}".format(alfred.name, alfred._id))
          self.add_default_availability(alfred)
          continue
        print('Alfred OK:{} {}'.format(alfred.name, alfred._id))
          
          
if __name__ == '__main__':
    a = AvailabilitiesUpdate(sys.argv[1])
    a.update()
    
  
