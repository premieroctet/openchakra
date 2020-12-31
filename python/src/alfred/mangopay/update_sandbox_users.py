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

cache = Cache(directory='/tmp/mangopay')
#cache.clear()

# SANDBOX
mangopay.client_id='testmyalfredv2'
mangopay.apikey='cSNrzHm5YRaQxTdZVqWxWAnyYDphvg2hzBVdgTiAOLmgxvF2oN'
mangopay.sandbox = True

handler = APIRequest()

@cache.memoize(name='mangopay_ids', expire=1e10)
def get_mangopay_ids(email):
  all_mangopay = get_mangopay_users()
  mango_users = sorted([m for m in all_mangopay if m['email']==email.lower()], key=lambda u : u['id'], reverse=True)
  mango_id = next((m for m in mango_users if m['tag'] and 'Client' in m['tag']), None)
  mango_provider_id = next((m for m in mango_users if m['tag'] and 'Provider' in m['tag']), None)
  return (mango_id, mango_provider_id)
  
#@cache.memoize(name='mangopay_kyc', expire=1e10)
def get_kyc(user_id):
  print('Getting KYC for {}'.format(user_id))
  all_docs=sorted(User.get(user_id).documents.all(), key = lambda d: d.Id, reverse=True)
  print(all_docs)
  doc=all_docs[0] if all_docs else None
  res = {'id': doc.Id, 'type': doc.type, 'status': doc.status, 'error': doc.refused_reason_type} if doc else None
  return res
  
@cache.memoize(name='mangopay_users', expire=1e10)
def get_mangopay_users():    
  print('Getting Mangopay users')
  all_mangopay=[]
  for p in range(0, 1000000):
    print("Getting users page {}".format(p))
    l=User.all(page=p, per_page=100)
    if not l:
      break
    all_mangopay+=l
    
  return [{'email': u.email, 'id': u.Id, 'tag': u.tag} for u in all_mangopay]


class UpdateSandboxUsers(FixBase):
    
    KEY='mangopay_users'
    
    def clear_all (self):
      users = self.db.get_items("users")
      for u in users:
        u.id_mangopay=None
        u.mangopay_provider_id=None
        u.identity_proof_id = None
        u.kyc_status = None
        u.kyc_error = None
        self.db.update_document("users", u)
          
    def update_mangopay_ids(self):
      get_mangopay_users()
      
      users = self.db.get_items("users")
      for u in (u for u in users if '@' in u.email):
        mail = u.email
        mangopay_id, mangopay_provider_id = get_mangopay_ids(mail)
        
        u.id_mangopay = mangopay_id['id'] if mangopay_id else None
        u.mangopay_provider_id = mangopay_provider_id['id'] if mangopay_provider_id else None
        self.db.update_document("users", u)
        print(u.email, u.id_mangopay, u.mangopay_provider_id)


    def update_mangopay_kycs(self):

      users = self.db.get_items("users")
      for u in (u for u in users if u.get('mangopay_provider_id', None) and 'fouilla' in u.get('email', '')):
        kyc = get_kyc(u.mangopay_provider_id)
        print(u.email, u.mangopay_provider_id, kyc)
        u.identity_proof_id = kyc['id'] if kyc else None
        u.kyc_status = kyc['status'] if kyc else None 
        u.kyc_error = kyc['error'] if kyc else None
        self.db.update_document("users", u)
        print('After:{}'.format(u))

if __name__ == '__main__':
    
    mangopay_updater = UpdateSandboxUsers('test-myAlfred-V2')
    """
    mangopay_updater.clear_all()
    mangopay_updater.update_mangopay_ids()
    """
    mangopay_updater.update_mangopay_kycs()
