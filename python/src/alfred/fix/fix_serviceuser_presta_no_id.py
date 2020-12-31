'''
Created on 5 mars 2020

@author: seb
'''
from alfred.database.db_access import DBAccess
import sys
from bson.objectid import ObjectId

class FixServiceUserPrestaNoId(object):

    def __init__(self, db_name):
        self.db = DBAccess(db_name)
    
    def fix(self):
        serviceusers = self.db.get_items("serviceusers")
        for su in serviceusers:
          for idx, presta in enumerate(su.prestations):
            if (not '_id' in presta):
              print("Serviceuser : presta with no id : {} {}".format(idx, su['_id']))
              for p in su.prestations:
                p['_id']=ObjectId()
              self.db.update_document("serviceusers", su)
              break
        
if __name__ == '__main__':
    FixServiceUserPrestaNoId(sys.argv[1]).fix()
