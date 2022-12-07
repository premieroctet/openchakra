'''
Created on 24 nov. 2019

@author: seb
'''
import pymongo
import os
import sys

from alfred.database.db_access import DBAccess
from alfred.db_check.rules import AttributesExist, RuleException
from alfred.db_check.rules_loader import RulesLoader
from bson.objectid import ObjectId
from csv import DictReader
from functools import lru_cache
from bson.objectid import ObjectId


class DatabaseCheck:
  
  def __init__(self, db_name):
    self.db = DBAccess(db_name)

  def load_rules(self):
    loader = RulesLoader("/home/seb/workspace/myalfred/server/models")
    return loader.load_rules()

  def check(self):
    result = []
    for rule in self.load_rules():
        result += rule.validate(self.db)
    return result

if __name__ == '__main__':
    db_name = sys.argv[1]
    checker = DatabaseCheck(db_name)
    result = checker.check()
    print("\n".join(map(str, result)))
    print("Errors:{}".format(len(result)))
