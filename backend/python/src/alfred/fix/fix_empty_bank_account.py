'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixEmptyBankAccount(FixBase):

    def fix(self):
        users = self.db.get_items("users")
        for user in users:
          bank = user.account
          if not bank:
            continue
          print(bank)
             
        
if __name__ == '__main__':
    FixEmptyBankAccount(sys.argv[1]).fix()