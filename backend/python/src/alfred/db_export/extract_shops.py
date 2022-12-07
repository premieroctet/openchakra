'''
Created on 6 mars 2020

@author: seb
'''
from sqlite3 import dbapi2
from alfred.database.db_access import DBAccess
from _csv import writer
import sys
from alfred.misc.utils import AttributeDict

class ExtractShops(object):

    def __init__(self, db_name):
        object.__init__(self)
        self.db = DBAccess(db_name)
        
    def extract(self):
        users = dict((u._id, "{} {}".format(u.firstname, u.name)) for u in self.db.get_items("users"))
        services = dict((u._id, u.label) for u in self.db.get_items("services"))
        prestations = dict((u._id, u) for u in self.db.get_items("prestations"))
        billings = dict((str(u._id), u.label) for u in self.db.get_items("billings"))
        serviceusers = self.db.get_items("serviceusers")
        w = writer(sys.stdout, delimiter=";")
        #w.writerow("prestation privée prix facturation service alfred".split()) 
        w.writerow("service alfred nb_prestations".split())
        for su in serviceusers:
            alfred = users[su.user]
            service = services[su.service]
            """
            for presta in map(AttributeDict, su.prestations):
                try:
                    prestation=prestations[presta.prestation]
                    private = prestation.get("private_alfred", "")
                    plabel = prestation.label
                    price = presta.price
                    if not price or str(price)=='0':
                        raise Exception("Prix à zéro")
                    billing = billings.get(presta.billing, presta.billing)
                except Exception as e:
                    print("Error {} {}/{}:{}".format(alfred, su._id, presta, str(e)))
            """     
            w.writerow([service, alfred, len(su.prestations)])
            
        
if __name__ == '__main__':
    ExtractShops(sys.argv[1]).extract()