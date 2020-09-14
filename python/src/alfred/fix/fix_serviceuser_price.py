'''
Created on 5 mars 2020

@author: seb
'''
from alfred.database.db_access import DBAccess
import sys

class FixServiceUserPrice(object):

    def __init__(self, db_name):
        self.db = DBAccess(db_name)
    
    def fix(self):
        services = self.db.get_items("serviceusers")
        prestations = self.db.get_items("prestations")
        for s in services:
          #print(s._id)
          prestas = s.prestations;
          for presta in prestas:
            if (not presta['price']):
              print("Empty price presta {}".format(presta['_id']))
              p = next((p for p in prestations if p._id==presta['prestation']), None)
              print(p)
            if (not presta.get('prestation', None)):
              print("Empty presta {}".format(presta['_id']))
        
if __name__ == '__main__':
    FixServiceUserPrice(sys.argv[1]).fix()
