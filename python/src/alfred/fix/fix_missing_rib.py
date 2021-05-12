'''
Created on 5 mars 2020

@author: seb
'''
import sys
import mangopay
from mangopay.resources import User, BankAccount 

from alfred.fix.fix_base import FixBase

from diskcache import Index
from pprint import pprint

MANGOPAY_IDS={
  'test-myAlfred-V2': {
    'client_id':'testmyalfredv2',
    'apikey':'cSNrzHm5YRaQxTdZVqWxWAnyYDphvg2hzBVdgTiAOLmgxvF2oN',
    'sandbox':True,
    },
  'test-myAlfred': {
    'client_id': 'myalfredprod',
    'apikey': 'j8R8fLZmUderNNp27siCqMAJ3y7Bv7BB82trfGuhqSKcYpEZ91',
    'sandbox': False,    
    }
  }


"""
Synchronizes RIBs between Mangopay client and provider accounts
"""
class FixMissingRib(FixBase):

  index=Index('/tmp/FixMissingRib')
  
  def __init__(self, db_name):
    super(FixMissingRib, self).__init__(db_name)
    values=MANGOPAY_IDS[db_name]
    mangopay.client_id = values['client_id']
    mangopay.apikey = values['apikey']
    mangopay.sandbox = values['sandbox']

  
  def fix(self):
    alfreds = self.db.get_items("users", {'is_alfred' : True}, exclude_fields=['birthday'])
    print(len(alfreds))
    pprint([a for a in alfreds if 'id_mangopay' not in a])
    alfreds= [a for a in alfreds if a.id_mangopay and a.mangopay_provider_id]
    print(len(alfreds))
    for idx, alfred in enumerate(alfreds):
      if alfred._id in self.index:
        print('Already checked {}'.format(alfred._id))
        continue
      self.index[alfred._id]=True
      print("{}/{}".format(idx, len(alfreds)))
      customer=User.get(alfred.id_mangopay)
      customer_accounts=customer.bankaccounts.all()
      provider=User.get(alfred.mangopay_provider_id)
      provider_accounts=provider.bankaccounts.all()
      if (customer_accounts or provider_accounts):
        missing_accounts=[a for a in customer_accounts if not [p for p in provider_accounts if p.IBAN==a.IBAN]]
        if missing_accounts:
          print(alfred.id_mangopay, alfred.mangopay_provider_id)
          print([a.IBAN for a in customer_accounts], [a.IBAN for a in provider_accounts])
          print(missing_accounts)
          for missing_account in missing_accounts:
            print(missing_account)
            new_account=BankAccount(
              owner_name=missing_account.owner_name,
              user_id=alfred.mangopay_provider_id,
              type=missing_account.type,
              owner_address=missing_account.owner_address,
              iban=missing_account.iban,
              bic=missing_account.bic
            )
            print(new_account.save())
    print('Finished fix')
            
        
if __name__ == '__main__':
    FixMissingRib(sys.argv[1]).fix()