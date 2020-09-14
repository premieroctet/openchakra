'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixShopsCreationDate(FixBase):

    def fix(self):
        shops = self.db.get_items("shops")
        users = self.db.get_items("users")
        no_date_shops = filter(lambda s : not s.get('creation_date', None), shops)
        for s in no_date_shops:
          user = next(filter(lambda u : u._id==s.alfred, users), None)
          if not user:
            print("No user")
            continue
          alf_date = user.creation_date
          doc = { '_id': s._id, 'creation_date': alf_date}
          print("Updating {} with {}".format(s._id, alf_date))
          self.db.update_document('shops', doc)
            
        
if __name__ == '__main__':
    FixShopsCreationDate(sys.argv[1]).fix()