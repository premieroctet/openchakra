'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase
from datetime import datetime
from alfred.misc.utils import get_items
from dateutil.relativedelta import relativedelta
from pprint import pprint

class UpdateAvailabilities(FixBase):
  
  PERIOD_END=datetime.today()+relativedelta(months=6)
  DEFAULT_AVAILABILITY={
    'period': {
      'begin': datetime.today(),
      'end': PERIOD_END,
      'days': [i for i in range(6)]
    },
     'available':True,
     'user':None,
     'timelapses':[i for i in range(9, 19)]
  }
  
  def apply(self):
    users = self.db.get_items("users", exclude_fields=['birthday'])
    alfreds = [u for u in users if 'is_alfred' in u and u['is_alfred']]
    all_availabilities = self.db.get_items("availabilities")
    no_availabilities=0
    no_periodic = 0
    for alfred in alfreds:
      avails=get_items(all_availabilities, alfred._id, "user")
      period_avails=[a for a in avails if a.period!=None and 'begin' in a.period and a.available]
      
      if len(avails)==0:
        print('Sans dispo : {} {} {} {}'.format(alfred.firstname, alfred.name, alfred._id, alfred.email))
        no_availabilities+=1
        self.DEFAULT_AVAILABILITY['user'] = alfred._id
        if '_id' in self.DEFAULT_AVAILABILITY:
          del(self.DEFAULT_AVAILABILITY['_id'])
        self.db.insert_document("availabilities", self.DEFAULT_AVAILABILITY)
        print('\tDispo ajoutée : {}'.format(self.DEFAULT_AVAILABILITY))
        continue
      if len(period_avails)==0:
        print('Sans dispo périodique: {} {} {} {}'.format(alfred.firstname, alfred.name, alfred._id, alfred.email))
        no_periodic+=1
        continue
      try:
        latest_periodic=max(period_avails, key=lambda p : p.period['end'])
        if latest_periodic.period['end']<self.PERIOD_END:
          print('Dispos expirées: {} {} {} {}'.format(alfred.firstname, alfred.name, alfred._id, alfred.email))
          print('\tMAJ de : {} {}'.format(latest_periodic._id, latest_periodic))
          latest_periodic['period']['end']=self.PERIOD_END
          self.db.update_document("availabilities", latest_periodic)
          print('\tvers : {}'.format(latest_periodic))
      except Exception as e:
        print('Erreur:{}'.format(e))
        pprint(period_avails)
        
        
    print("Sans dispo:{}, sans dispo périodique:{}".format(no_availabilities, no_periodic))
        
if __name__ == '__main__':
    UpdateAvailabilities(sys.argv[1]).apply()
    