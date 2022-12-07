'''
Created on 5 mars 2020

@author: seb
'''
import sys

import mangopay
from mangopay.api import APIRequest
from mangopay.resources import NaturalUser
from alfred.fix.fix_base import FixBase

# PROD
mangopay.client_id='myalfredprod'
mangopay.apikey='j8R8fLZmUderNNp27siCqMAJ3y7Bv7BB82trfGuhqSKcYpEZ91'
mangopay.sandbox = False

handler = APIRequest()

class FixMangoPayAccountTag(FixBase):
    
    def fix(self):
        users = self.db.get_items("users")
        for u in users:
          if not 'id_mangopay' in u or not u.id_mangopay:
            continue
          print(u.id_mangopay)
          mango_user = NaturalUser.get(u.id_mangopay)
          print(mango_user.tag)
          tag="Client {} / {} {}".format(u._id, u.firstname, u.name)
          mango_user.tag=tag
          newUser = NaturalUser.update(mango_user)
          print(str(newUser.model.tag))
        
if __name__ == '__main__':
    FixMangoPayAccountTag(sys.argv[1]).fix()
