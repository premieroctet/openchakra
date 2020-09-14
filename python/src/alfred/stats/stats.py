# -*- coding: utf-8 -*-
'''
Created on 11 août 2019

@author: seb
'''
from alfred.database.db_access import DBAccess
from collections import Counter

class Stats(object):

  ATTRIBUTES={ 
    'serviceusers': 'minimum_basket deadline_before_booking perimeter'.split(),
    'shops': ["booking_request no_booking_request".split(), "my_alfred_conditions profile_picture identity_card recommandations".split(), "flexible_cancel moderate_cancel strict_cancel".split()]
  }  
  
  def __init__(self, db_name):
    self.db = DBAccess(db_name)
   
  def run(self):
    for model, attributes in self.ATTRIBUTES.items():
      items=self.db.get_items(model)
      for att in attributes:
        if isinstance(att, str):
          c=Counter([i.get(att, None) for i in items])
        else:
          c=Counter([ max([a if i.get(a,False) else '' for a in att]) for i in items])
        print(model, att)
        nb_items = len(items)
        for (attr, nb) in c.most_common(10):
          if attr:
            print("\t{} : {:.1f}%".format(attr, nb*100.0/nb_items))
      
if __name__ == '__main__':
    Stats('test-myAlfred-V2').run()      
