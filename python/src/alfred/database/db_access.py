'''
Created on 11 janv. 2020

@author: seb
'''
import pymongo
from bson import SON
from alfred.misc.utils import AttributeDict


class DBAccess():
  
  def __init__(self, db_name):
    super(DBAccess, self).__init__()
    self.client = pymongo.MongoClient()
    if not db_name in self.client.list_database_names():
      raise Exception("Unkown database {}".format(db_name))
    self.database = self.client[db_name]
    self.db_name = db_name

  def get_collections(self):
    return self.database.list_collection_names()

  def get_attributes(self, coll_name):
    if not coll_name in self.database.list_collection_names():
      raise Exception("Unkown collection {}".format(coll_name))
    coll=self.database[coll_name]
    all_attributes=set().union(*(doc.keys() for doc in coll.find()))
    return sorted(all_attributes)

  def get_by_label(self, coll_name, label):
    if not coll_name in self.database.list_collection_names():
      raise Exception("Unkown collection {}".format(coll_name))
    coll = self.database[coll_name]
    return coll.find_one({'label': label})

  def get_items(self, coll_name, fltr={}):
    if not coll_name in self.database.list_collection_names():
      raise Exception("Unkown collection {} amongst {}".format(coll_name, sorted(self.database.list_collection_names())))
    coll = self.database[coll_name]
    return list(map(AttributeDict, coll.find(dict(fltr))))

  def get_item(self, coll_name, fltr):
    if not coll_name in self.database.list_collection_names():
      raise Exception("Unkown collection {}".format(coll_name))
    coll = self.database[coll_name]
    return coll.find_one(fltr)

  def insert_document(self, coll_name, document):
    coll = self.database[coll_name]
    _id = coll.insert_one(document).inserted_id
    return _id

  def update_document(self, coll_name, document):
    coll = self.database[coll_name]
    coll.update_one({"_id": document['_id']}, {"$set": document})

  def remove_document(self, coll_name, doc_id):
    coll = self.database[coll_name]
    coll.delete_one({"_id": doc_id})

