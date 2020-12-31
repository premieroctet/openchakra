'''
Created on 25 nov. 2019

@author: seb
'''
import unittest
from alfred.database.db_access import DBAccess
from alfred.db_check.rules import AttributesExist


class TestDatabase(unittest.TestCase):

    def testConnection(self):
      db=DBAccess("test-myAlfred")
      print(db.get_attributes("users"))
        
    def testRule(self):
      db = DBAccess('test-myAlfred')
      rule = AttributesExist('users', 'active creation_date'.split())
      rule.validate(db)
      
if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testConnection']
    unittest.main()