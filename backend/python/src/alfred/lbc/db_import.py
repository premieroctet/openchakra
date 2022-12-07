'''
Created on 15 juin 2020

@author: seb
'''
from alfred.database.db_access import DBAccess
from pprint import pprint

class DBImport(object):
  
  def __init__(self, dbname, formatted_data):
    self.contents=formatted_data
    self.db=DBAccess(dbname)
    
  def imp(self):
    db_prospects=self.db.get_items("prospects")
    for l in self.contents:
      phone = l['phone']
      pprint(phone)
      if next((p for p in db_prospects if p.phone==phone), None):
        print('Connu')
        continue
      self.db.insert_document("prospects", l)
      
