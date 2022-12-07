'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixAlfredWithoutShop(FixBase):
    
    def fix(self):
        alfreds = self.db.get_items("users", {'is_alfred' : True})
        shops = self.db.get_items("shops")
        alfreds_without_shop = [a for a in alfreds if not next(filter(lambda s : s['alfred']==a._id, shops), None)]
        for u in alfreds_without_shop:
          print(u)
        print(len(alfreds_without_shop))
                
            
            
        
if __name__ == '__main__':
    FixAlfredWithoutShop(sys.argv[1]).fix()