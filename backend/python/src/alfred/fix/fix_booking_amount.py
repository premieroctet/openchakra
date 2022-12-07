'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixBookingAmount(FixBase):
    
    def fix(self):
        bookings = self.db.get_items("bookings")
        for b in bookings:
          print(b.amount)
          b.amount=float(b.amount)
          self.db.update_document("bookings", { "_id" : b._id, "amount": float(b.amount)})

if __name__ == '__main__':
    FixBookingAmount(sys.argv[1]).fix()
