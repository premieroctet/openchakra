'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixOrphanShops(FixBase):

    def fix(self):
        shops = self.db.get_items("shops")
        users = self.db.get_items("users")
        orphan_shops = [s for s in shops if not next(filter(lambda u : s['alfred']==u._id, users), None)]
        for s in orphan_shops:
          print("Pas de user pour {}, alfred {}, services {}".format(s._id, s.alfred, s.services))
          self.db.remove_document("shops", s._id)
        print("{} orphan shops".format(len(orphan_shops)))
                
            
            
        
if __name__ == '__main__':
    FixOrphanShops(sys.argv[1]).fix()