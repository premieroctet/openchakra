'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixMultipleShops(FixBase):

    def fix(self):
        alfreds = self.db.get_items("users", {'is_alfred' : True})
        shops = self.db.get_items("shops")
        alfreds_shops = dict([(a.email, [s for s in shops if s['alfred']==a._id]) for a in alfreds ])
        alfred_many = [(a, s) for (a, s) in alfreds_shops.items() if len(s)>1]
        for (u, shops) in alfred_many:
          print(u, [(s.creation_date, s.services) for s in sorted(shops, key = lambda s:s.creation_date, reverse=True)])
        print(len(alfred_many))
             
        
if __name__ == '__main__':
    FixMultipleShops(sys.argv[1]).fix()