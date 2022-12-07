'''
Created on 6 mars 2020

@author: seb
'''
from alfred.database.db_access import DBAccess
from _csv import writer
import sys
from alfred.misc.utils import get_item

OUI_NON={True: 'O', False: 'N'}

class AllInclusiveExport(object):
    
    TITLES=[
      'Prestation', 'Service', 'Catégorie', 'Facturation', 'Eligible au CESU', 'Filtre présentation', 'Equipements', 
      'Chez le client', "Chez l'Alfred", 'En visio', 'Métier', 'Frais de livraison', 'Frais de déplacement', 'Pour particuliers', 'Pour pros'
      ]
    
    def __init__(self, db_name):
        object.__init__(self)
        self.db = DBAccess(db_name)
        self.services={}
        self.categories={}
        self.billings={}
        self.prestations={}
        self.users={}
        self.shops={}
        self.filters={}
        self.equipments={}
        self.jobs={}
    
    def get_item(self, collection, cache, _id, field="_id"):
      if _id not in cache:
        cache[_id]=get_item(collection, _id, field)
      return cache[_id]
      
    def extract(self):
        services = self.db.get_items("services")
        categories = self.db.get_items("categories")
        prestations = [p for p in self.db.get_items("prestations") if not 'private_alfred' in p or not p.private_alfred]
        billings = self.db.get_items("billings")
        filters = self.db.get_items("filterpresentations")
        equipments = self.db.get_items("equipment")
        jobs = self.db.get_items("jobs")

        w = writer(sys.stdout, delimiter=",")
        w.writerow(self.TITLES)
        for p in prestations:
          try:
            service=self.get_item(services, self.services, p.service)
            category=self.get_item(categories, self.categories, service.category)
            presta_billings=";".join([self.get_item(billings, self.billings, b)['label'] for b in p.billing])
            presta_equipments=";".join([self.get_item(equipments, self.equipments, e)['label'] for e in service.equipments])
            client=OUI_NON[service.location and service.location['client']]
            alfred=OUI_NON[service.location and service.location['alfred']]
            visio= OUI_NON[service.location and service.location['visio']]
            presta_job=self.get_item(jobs, self.jobs, p.job)['label'] if 'job' in p else ''
            filter_=self.get_item(filters, self.filters, p.filter_presentation)['label'] if p.filter_presentation else ''
            w.writerow([
              p.label, service.label, category.label, presta_billings, OUI_NON[p.get('cesu_eligible', False)], 
              filter_, presta_equipments, client, alfred, visio, presta_job, OUI_NON[service.get('pick_tax', 0)], 
              OUI_NON[service.get('travel_tax', 0)], OUI_NON[p.particular_access], OUI_NON[p.professional_access]
            ])
          except Exception as e:
            raise e
            print("{} {}".format(p._id, e), file=sys.stderr)
            
        
if __name__ == '__main__':
    AllInclusiveExport(sys.argv[1]).extract()