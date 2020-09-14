'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixPhoneNumbers(FixBase):

    def fix(self):
      alfreds = self.db.get_items("users")
      for u in alfreds:
        phone=u.get('phone', '') or ''
        if (len(phone)==10) and phone.startswith("0"):
          newphone='33'+phone[1:]
          print(phone, newphone)
          self.db.update_document("users", {"_id": u._id, "phone": newphone })
        if not 'phone' in u:
          self.db.update_document("users", {"_id": u._id, "phone": None })
        
if __name__ == '__main__':
    FixPhoneNumbers(sys.argv[1]).fix()
    