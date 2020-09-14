'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixShopsNoService(FixBase):

    def fix(self):
        shops = self.db.get_items("shops")
        for s in shops:
          if not s.get('services', None):
            print("Shop empty : {} for user {}".format(s._id, s.get('alfred')))
                
            
            
        
if __name__ == '__main__':
    FixShopsNoService(sys.argv[1]).fix()