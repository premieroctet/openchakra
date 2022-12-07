'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase
from alfred.misc.utils import get_item

class FixEmptyServiceUser(FixBase):
    
    def fix(self):
        serviceusers = self.db.get_items("serviceusers", {'prestations' : []})
        users = self.db.get_items("users")
        shops = self.db.get_items("shops")
        for su in serviceusers:
          print(su['_id'], su['prestations'])
          user = get_item(users, su.user)
          shop = get_item(shops, su.user, "alfred")
          print("User:",user._id, user.email, shop['_id'])
          services=shop['services']
          print("Before:{}".format(services))
          ss=[s for s in services if str(s)!=str(su['_id'])]
          print("After:{}".format(ss))
          shop['services']=ss
          self.db.update_document("shops", shop)
          self.db.remove_document("serviceusers", su['_id'])
          print()
                
            
            
        
if __name__ == '__main__':
    FixEmptyServiceUser(sys.argv[1]).fix()