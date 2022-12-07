'''
Created on 26 janv. 2021

@author: seb
'''
from alfred.database.db_access import DBAccess
import sys
from alfred.misc.consts import get_items

class PrestationsProReport(object):

    def __init__(self, db_name):
      super()
      self.db=DBAccess(db_name)
      
    def report(self):
      shops = self.db.get_items("shops")
      serviceusers=self.db.get_items("serviceusers")
      pro=[s for s in shops if s.get('is_professional', False)]
      count_su = 0
      count_prestas = 0
      for p in pro:
        for suid in p.services:
          su = get_items(serviceusers, suid)
          if len(su):
            count_su +=1
            count_prestas += len(su[0].prestations)
            
      print("Boutiques pros:{}".format(len(pro)))
      print("Services pros:{}".format(count_su))
      print("Prestations pros:{}".format(count_prestas))
      
      
if __name__ == '__main__':
    PrestationsProReport(sys.argv[1]).report()