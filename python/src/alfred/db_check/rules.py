'''
Created on 11 janv. 2020

@author: seb
'''
import sys

class RuleException(Exception):
    pass

class DBCheckRule(object):
  def __init__(self):
    super(object, self).__init__()

class AttributesExist(DBCheckRule):

    def __init__(self, collection, attributes):
      super(AttributesExist, self).__init__()
      self.collection=collection
      self.expected_attributes=attributes
        
    def validate(self, db):
      errors = []
      for it in db.get_items(self.collection):
        print("New item")
        found_attributes = it.keys()-set(["__v"])
        diff=set(found_attributes).symmetric_difference(self.expected_attributes)
        if diff:
            errors.append(RuleException("Missing fields:{}.{} on {}".format(self.collection, sorted(diff), sorted(i for i in it.items() if i[0] in ('_id', 'label', 'name')))))
      return errors
    
class ReferenceExists(DBCheckRule):
  
    def __init__(self, src_coll, attribute, dst_coll):
      super(ReferenceExists, self).__init__()
        
        
