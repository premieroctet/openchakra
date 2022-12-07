import os
import sys

from alfred.database.db_access import DBAccess
from alfred.misc.utils import get_item
from csv import writer


class CesuExport(object):

    def __init__(self, db_name):
        super(object, self).__init__()
        self.db = DBAccess(db_name)

    def export(self, directory):
      categories = self.db.get_items('categories') 
      services = self.db.get_items('services') 
      prestations = self.db.get_items('prestations')

      keys = 'categorie service prestation eligible_cesu privée'.split()
      out = open(os.path.join(directory, "export_prestations_cesu.csv"), "w", encoding='utf-8')
      d=writer(out, delimiter=";")
      d.writerow(keys)
      
      rows=[]
      for p in prestations:
        s = get_item(services, p.service)
        c = get_item(categories, s.category)
        
        rows.append([c.label, s.label, p.label, 1 if p.get('cesu_eligible', False) else 0, 1 if p.private_alfred else 0])
        #d.writerow([c.label, s.label, p.label, 1 if p.get('cesu_eligible', False) else 0, 1 if p.private_alfred else 0])
      rows=sorted(rows, key=lambda r : (r[0], r[1], r[2]))
      d.writerows(rows)

if __name__ == '__main__':
    exp=CesuExport(sys.argv[1])
    exp.export(sys.argv[2])
