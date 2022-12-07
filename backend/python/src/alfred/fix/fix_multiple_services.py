'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixMultipleServices(FixBase):

    def get_service(self, _id, services):
      res = next((s for s in services if str(s._id)==str(_id)), None)
      return str(res.service) if res else None
      
    def fix(self):
        shops = self.db.get_items("shops")
        serviceusers = self.db.get_items("serviceusers")
        for shop in shops:
          if len(shop.services)==1:
            continue
          services=[self.get_service(_id, serviceusers) for _id in shop.services]
          services=[s for s in services if s]
          if len(set(services))!=len(services):
            print("****Services identiques dans le shop {} d'alfred {} créée le {}".format(shop._id, shop.alfred, shop.creation_date))
             
        
if __name__ == '__main__':
    FixMultipleServices(sys.argv[1]).fix()