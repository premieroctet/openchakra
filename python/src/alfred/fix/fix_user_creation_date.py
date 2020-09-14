'''
Created on 5 mars 2020

@author: seb
'''
from datetime import timedelta
import sys
from alfred.fix.fix_base import FixBase

class FixUserCreationDate(FixBase):

    URL = "https://api-adresse.data.gouv.fr/search/?q={}"
    
    def fix(self):
        users = self.db.get_items("users")
        for u in users:
          dt = u.get('creation_date', None)
          if dt:
            prev_date = dt
          else:
            prev_date = prev_date+timedelta(hours=1)
            print('No date, using {}'.format(prev_date))
            document = { '_id': u._id, 'creation_date': prev_date}
            self.db.update_document("users", document)

if __name__ == '__main__':
    FixUserCreationDate(sys.argv[1]).fix()
