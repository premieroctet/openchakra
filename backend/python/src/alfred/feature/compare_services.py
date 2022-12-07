'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.database.db_access import DBAccess
from _collections import defaultdict
from alfred.misc.consts import get_item

class CompareServices(object):
  
  def __init__(self, db_before, db_after):
    self.db_before = DBAccess(db_before)
    self.db_after = DBAccess(db_after)
  
  def apply(self):
    users = self.db_after.get_items("users", exclude_fields=['birthday'])
    susBefore = self.db_before.get_items("serviceusers")
    susAfter = self.db_after.get_items("serviceusers")
    
    prestationsBefore=defaultdict(int)
    prestationsAfter=defaultdict(int)
    for su in susBefore:
      prestationsBefore[str(su.user)]+=len(su.prestations)
    for su in susAfter:
      prestationsAfter[str(su.user)]+=len(su.prestations)
    
    # Compare
    for user, nb_prestas_before in prestationsBefore.items():
      nb_prestas_after=prestationsAfter.get(user, 0)
      if nb_prestas_before>nb_prestas_after:
        email = get_item(users, user)['email']
        print('User {} : {} prestations before => {} prestations after'.format(email, nb_prestas_before, nb_prestas_after))
      
      
if __name__ == '__main__':
    CompareServices(sys.argv[1], sys.argv[2]).apply()
    