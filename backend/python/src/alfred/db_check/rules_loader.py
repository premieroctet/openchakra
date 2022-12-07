'''
Created on 24 nov. 2019

@author: seb
'''
import json
import re

import pymongo
import os
import sys

from alfred.database.db_access import DBAccess
from alfred.db_check.rules import AttributesExist, RuleException
from bson.objectid import ObjectId
from csv import DictReader
from functools import lru_cache
from bson.objectid import ObjectId

class RulesLoader():
  
  def __init__(self, db_name, models_dir):
    self.path = models_dir
    self.db = DBAccess(db_name)

  def get_mapping(self, filename):
    MAPPING = {
        "Availability.js": "availabilities",
        "Billing.js": "billings",
        "Booking.js": None,
        "Calculating.js": "calculatings",
        "Calendar.js": "calendars",
        "Category.js": "categories",
        "Equipment.js": "equipment",
        "Favoris.js": "favoris",
        "FilterPresentation.js": "filterpresentations",
        "Job.js": "jobs",
        "Message.js": None,
        "Newsletter.js": None,
        "Options.js": "options",
        "Prestation.js": "prestations",
        "ResetToken.js": "resettokens",
        "Reviews.js": None,
        "SearchFilter.js": None,
        "Service.js": "services",
        "ServiceUser.js": "serviceusers",
        "ShopBanner.js": "shopbanners",
        "Shop.js": "shops",
        "Tags.js": "tags",
        "User.js": "users",
    }
    return MAPPING[filename]

  def load_rules(self):
    rules=[]
    files = sorted([f for f in os.listdir(self.path) if f.endswith(".js")])
    for f in files:
        coll_name = self.get_mapping(f)
        if coll_name is None:
            #print("Skipping {}".format(f))
            continue
        if not coll_name in self.db.get_collections():
            raise Exception("Unknown collection {}".format(coll_name))
        full_path = os.path.join(self.path, f)
        contents = open(full_path).readlines()
        contents = [l for l in contents if not "require(" in l and not 'mongoose.Schema' in l and l.strip() and not "module.exports" in l]
        contents = [l for l in contents if not "getFullYear" in l]
        contents[0] = "{"
        contents = "".join(contents)
        contents = contents.replace(");", '')
        contents = contents.replace(r"'", '')

        # Dégueu #1
        contents = contents.replace(r"[Acceptée,Refusée,En attente]", "\"['Acceptée','Refusée','En attente']\"")
        # Dégueu #2
        contents = contents.replace("`${year}-01-01`","\"`${year}-01-01`\"")

        contents = re.sub(r'([\w\.]+)(\s*):', r'"\1"\2:', contents)
        contents = re.sub(r': ([\w\.]+)', r': "\1"', contents)
        #print("Inspecting {}".format(f))
        js = json.loads(contents)
        rules.append(AttributesExist(coll_name, set(js.keys()).union(set(["_id"]))))
    return rules

  def check(self):
    result = []
    for rule in self.load_rules():
        try:
            rule.validate(self.db)
        except RuleException as re:
            result.append(re)
    return result

if __name__ == '__main__':
    loader = RulesLoader(sys.argv[1], sys.argv[2])
    print(loader.load_rules())
