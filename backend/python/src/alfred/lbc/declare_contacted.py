'''
Created on 15 juin 2020

@author: seb
'''
from alfred.database.db_access import DBAccess
import sys

class DeclaredContacted(object):
  
  def __init__(self, dbname, removefname):
    self.db = DBAccess(dbname)
    self.removefname=removefname
    
  def fix(self):
    declaredphones=set([l.strip() for l in open(self.removefname).readlines()])
    prospects = self.db.get_items("prospects")
    for p in prospects:
      if p.phone in declaredphones:
        print("{} déjà contacté".format(p.phone))
        self.db.update_document("prospects", { "_id" : p._id, "contacted": True})
      
  
if __name__ == '__main__':
    DeclaredContacted(sys.argv[1], sys.argv[2]).fix()
