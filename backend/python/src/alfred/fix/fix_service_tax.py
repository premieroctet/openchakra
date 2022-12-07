'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

"""
Update services:
 - tout service proposé chez le client peut potentiellement avoir des frais de déplacement
 - tout service proposé chez l'alfred peut potentiellement avoir des frais de retrait/livraison
"""
class FixServiceTax(FixBase):

    def fix(self):
      services = self.db.get_items("services")
      for s in services:
        update={}
        client = s.location['client']
        alfred = s.location['alfred']
        if client!=s.travel_tax:
          print(client, s.travel_tax, s)
          update['travel_tax'] = client
        if alfred!=s.pick_tax:
          print(alfred, s.pick_tax, s)
          update['pick_tax'] = alfred
        if update:
          update['_id']=s._id
          self.db.update_document("services", update)
    
if __name__ == '__main__':
    FixServiceTax(sys.argv[1]).fix()