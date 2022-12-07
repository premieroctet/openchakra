'''
Created on 5 mars 2020

@author: seb
'''

import mangopay
from mangopay.api import APIRequest
from mangopay.resources import User
from alfred.fix.fix_base import FixBase
from diskcache import Cache
from mangopay.exceptions import APIError
import time
from alfred.misc.consts import AttributeDict

cache = Cache(directory='/tmp/mangopay')

# SANDBOX
mangopay.client_id='testmyalfredv2'
mangopay.apikey='cSNrzHm5YRaQxTdZVqWxWAnyYDphvg2hzBVdgTiAOLmgxvF2oN'
mangopay.sandbox = True

@cache.memoize(name='mangopay_users', expire=1e10)
def get_mangopay_users():    
  print('Getting Mangopay users')
  result=[]
  for p in range(0, 1000000):
    print("Getting users page {}".format(p))
    users=User.all(page=p, per_page=100)
    if not users:
      break
    for u in users:
      try:
        result.append({'email': u.email, 'id': u.Id, 'tag': u.tag, 'birthday': u.birthday})
      except AttributeError:
        result.append({'email': u.email, 'id': u.Id, 'tag': u.tag, 'birthday': 'legal'})
    
  return result 


class UpdateSandboxUsers(FixBase):
  
  def get_mangopay_ids(self, mangopay_users, email):
    mango_users = sorted([m for m in mangopay_users if m['email']==email.lower()], key=lambda u : u['id'], reverse=True)
    mango_id = next((m for m in mango_users if m['tag'] and 'Client' in m['tag']), None)
    mango_provider_id = next((m for m in mango_users if m['tag'] and 'Provider' in m['tag']), None)
    return (mango_id, mango_provider_id)
  
  def update(self):
    mangopay_users=get_mangopay_users()
    db_users = self.db.get_items("users", exclude_fields=['birthday'])
    print(len(mangopay_users))
    for u in db_users:
      if not 'email' in u:
        print(u)
      customer, provider = self.get_mangopay_ids(mangopay_users, u.email)
      print("{}:{}/{}".format(u.email, customer['id'] if customer else None, provider['id'] if provider else None))
      u.id_mangopay=customer['id'] if customer else None
      u.mangopay_provider_id=provider['id'] if provider else None
      self.db.update_document("users", u)

if __name__ == '__main__':
    
    mangopay_updater = UpdateSandboxUsers('test-myAlfred-V2')
    mangopay_updater.update()
