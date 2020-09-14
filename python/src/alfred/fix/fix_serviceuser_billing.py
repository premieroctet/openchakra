'''
Created on 5 mars 2020

@author: seb
'''
from bson.objectid import ObjectId
from bson.errors import InvalidId
import sys
from alfred.fix.fix_base import FixBase

class FixServiceUserBilling(FixBase):

    def find_billing(self, bill):
      if isinstance(bill, ObjectId):
        return bill
      if bill=='unitaire':
        bill='par prestation'
      try:
        return ObjectId(bill)
      except InvalidId:
        return next(filter(lambda b : b.label==bill, self.billings))._id
    
    def fix(self):
        sus = self.db.get_items("serviceusers")
        self.billings = self.db.get_items("billings")
        for su in sus:
          changed=False
          prestas=su.prestations
          for p in prestas:
            bill = p['billing']
            bill_id = self.find_billing(bill)
            if bill_id!=bill:
              p['billing']=bill_id
              changed=True
          if changed:
            print("Update")
            self.db.update_document("serviceusers", su)
        
if __name__ == '__main__':
    FixServiceUserBilling(sys.argv[1]).fix()