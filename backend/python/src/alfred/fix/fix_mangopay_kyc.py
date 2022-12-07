'''
Created on 5 mars 2020

@author: seb
'''
import sys

import mangopay
from mangopay.api import APIRequest
from mangopay.resources import Document, User
from alfred.fix.fix_base import FixBase
import time

# PROD
mangopay.client_id='myalfredprod'
mangopay.apikey='j8R8fLZmUderNNp27siCqMAJ3y7Bv7BB82trfGuhqSKcYpEZ91'
mangopay.sandbox = False

handler = APIRequest()

class FixMangoPayKyc(FixBase):
    
    ID_PROOF = 'IDENTITY_PROOF'
    REG_PROOF = 'REGISTRATION_PROOF'
    
    START_AT=None
   
    def __init__(self, db_name):
      super().__init__(db_name)
      self.active=not bool(self.START_AT)
      
    def update_status(self, user, doc_type, documents, id_field, status_field, error_field):
      updated = False
      docs = sorted([d for d in documents if d.type==doc_type], key=lambda d : int(d.id), reverse=True)   
      latest_doc = next(iter(docs), None)
      if latest_doc:
        d = Document.get(latest_doc.id)
        if user.get(id_field, None)!=d.id:
          user[id_field]=d.id
          updated=True
        if user.get(status_field, None)!=d.status:
          user[status_field]=d.status
          updated = True
        if user.get(error_field, None)!=d.refused_reason_type:
          print('Setting {} to {}'.format(error_field, d.refused_reason_type))
          user[error_field]=d.refused_reason_type
          updated = True
      return updated
      
    def update_all_status(self, user):
      if not user.get('mangopay_provider_id', None):
        print("Not provider")
        return False
      try:
        time.sleep(0.5)
        mp_user = User.get(user.mangopay_provider_id)
        documents = mp_user.documents.all()
        updated = False
        if self.update_status(user, self.ID_PROOF, documents, 'identity_proof_id', 'id_card_status', 'id_card_error'):
          updated = True
        if self.update_status(user, self.REG_PROOF, documents, 'registration_proof_id', 'registration_proof_status', 'registration_proof_error'):
          updated = True
        return updated
      except Exception as e:
        if 'UserDoesNotExist' in e.__class__.__name__:
          print('Utilisateur {} a un mangopay_provider_id inconnu {}'.format(user.email, user.mangopay_provider_id))
          return False
        else:
          raise
        
    def fix(self):
        users = self.db.get_items("users")
        for user in users:
          print(user.email)
          self.active = self.active or user.email==self.START_AT 
          print("Active:{}".format(self.active))
          if not self.active:
            continue
          if user.get('mangopay_provider_id', None):
            if self.update_all_status(user):
              print('Updating {}'.format(user.email))
              self.db.update_document("users", user)
        print("Fix terminé")
        
if __name__ == '__main__':
    FixMangoPayKyc(sys.argv[1]).fix()
