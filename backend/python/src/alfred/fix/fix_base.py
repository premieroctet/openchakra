'''
Created on 5 mars 2020

@author: seb
'''
from alfred.database.db_access import DBAccess

class FixBase(object):
    
    def __init__(self, db_name):
        self.db = DBAccess(db_name)
        print("{} on {}".format(self.__class__.__name__, db_name))
    
