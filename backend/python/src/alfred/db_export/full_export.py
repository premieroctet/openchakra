import os
import sys
from csv import DictWriter

from alfred.database.db_access import DBAccess
from datetime import datetime
import argparse


class FullExport(object):

    def __init__(self, db_name):
        super(object, self).__init__()
        self.db = DBAccess(db_name)

    def format(self, value):
      return value.strftime('%d/%m/%Y') if isinstance(value, datetime) else value
      
    def export(self, documents, columns, directory):
      for doc in sorted(self.db.get_collections()):
        if documents and not doc in documents:
          continue
        d = None
        out = open(os.path.join(directory, "{}.csv".format(doc)), "w", encoding='utf-8')
        keys=[]
        items = self.db.get_items(doc)
        for it in items:
          keys += [i for i in it.keys() if not i.startswith("__") and not i in keys]
        if columns:
          keys = [k for k in keys if k in columns]
            
        d=DictWriter(out, fieldnames=keys, delimiter=";")
        d.writeheader()
        for it in items:
          it = dict([(k,self.format(v)) for k,v in it.items() if k in keys])
          d.writerow(it)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Filtre collections/colonnes')
    parser.add_argument('--doc', default=[], type=lambda v : v.lower().split(','),
                       help='document(s) à exporter, séparés par points-virgules')
    parser.add_argument('--col', default=[], type=lambda v : v.lower().split(','),
                       help='colonne(s) à exporter, séparées par points-virgules')

    parser.add_argument('database',
                       help='base de données')
    parser.add_argument('output',
                       help='dossier destination')


    args = parser.parse_args()
    print(args)
    
    exp=FullExport(args.database)
    exp.export(args.doc, args.col, args.output)
