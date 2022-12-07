'''
Created on 24 nov. 2019

@author: seb
'''
import pymongo
import os
import sys

from alfred.database.db_access import DBAccess
from bson.objectid import ObjectId
from csv import DictReader
from functools import lru_cache
from bson.objectid import ObjectId

class PrestationsImport:
  

  LOC_MAP = dict(client='client', alfred='alfred', visio='visio')

  def __init__(self, db_name):
    self.client = pymongo.MongoClient()
    if not self.DB_NAME in self.client.database_names():
      raise Exception("Unkown database {}".format(self.DB_NAME))
    self.database = DBAccess(db_name)

  def get_location(self, loca_att):
    locations = loca_att.split(";")
    diff = set(locations).difference(set(self.LOC_MAP))
    if diff:
      raise Exception("Unknown location(s):{}".format(diff))
    result = {
      'client': 'client' in locations,
      'alfred': 'alfred' in locations,
      'visio': 'visio' in locations,
    }
    return result

  def get_billing(self, billing_att):
    while billing_att.endswith(";"):
      billing_att = billing_att[:-1]
    if not billing_att:
      raise Exception("Pb de billing vide")
    billings = billing_att.split(";")
    billings = [self.get_document("billings", methlabel)['_id'] for methlabel in billings]
    if None in billings:
      raise Exception("Pb de billing sur {}".format(billings))
    print(billings)
    return billings

  def get_document(self, collection, label):
    print("Get '{}'.'{}'".format(collection, label))
    doc =  self.database.get_by_label(collection, label)
    """
    if not doc:
      raise Exception("No doc found for {}/{}".format(collection, label))
    """
    return doc

  def import_data(self, fname):
    data = DictReader(open(fname), delimiter=",")
    null_filter_presentation = self.get_document("filterpresentations", "Aucun")
    if not null_filter_presentation:
      raise Exception("Filter aucun non trouvé")
    for doc in data:
      cat = self.get_document("categories", doc['Catégorie'])
      if not cat:
        raise Exception("Catégorie {} introuvable".format(cat))
      service_label = doc['Service'].strip()
      service = self.get_document("services", service_label)
      service_data = {
        "label": service_label,
        "category": cat['_id'],
        "equipments": [],
        "tags": [],
        "picture": "/static/service/{}.jpg".format(doc['Photo']) if doc['Photo'] else "",
        "description": service_label,
        "majoration": "",
        "location": self.get_location(doc['Option']),
      }
      if not service:
        print("Service to create")
        service=dict(service_data)
        service['_id'] = self.database.insert_document("services", service_data)
      else:
        print("Service to update:{}".format(service))
        service.update(service_data)
        #self.database.update_document("services", service)

      prestation_label = doc['Prestation'].strip()
      prestation = self.get_document("prestations", prestation_label)
      presta_data = {
        "label": prestation_label,
        "price": prestation_label,
        "service": service['_id'],
        "category": cat['_id'],
        "calculating": None,
        "billing": self.get_billing(doc['Facturation']),
        "search_filter": None,
        "job": None,
        "filter_presentation": null_filter_presentation['_id'],
        "description": prestation_label,
        "picture": "",
      }
      if not prestation:
        prestation=dict(presta_data)
        prestation['_id'] = self.database.insert_document("prestations", prestation)
      else:
        prestation.update(presta_data)
        #self.database.update_document("prestations", prestation)



if __name__ == '__main__':
    db_name=sys.argv[1]
    fname = sys.argv[2]
    
    di = PrestationsImport(db_name)
    di.import_data(fname)
