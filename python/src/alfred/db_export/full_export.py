import os
import sys
from csv import DictWriter

from alfred.database.db_access import DBAccess
from datetime import datetime


class FullExport(object):

    def __init__(self, db_name):
        super(object, self).__init__()
        self.db = DBAccess(db_name)

    def format(self, value):
      return value.strftime('%d/%m/%Y') if isinstance(value, datetime) else value
      
    def export(self, directory):
        for coll in sorted(self.db.get_collections()):
            d = None
            out = open(os.path.join(directory, "{}.csv".format(coll)), "w", encoding='utf-8')
            keys=[]
            items = self.db.get_items(coll)
            for it in items:
                keys += [i for i in it.keys() if not i.startswith("__") and not i in keys]
                
            d=DictWriter(out, fieldnames=keys, delimiter=";")
            d.writeheader()
            for it in items:
                it = dict([(k,self.format(v)) for k,v in it.items() if k in keys])
                d.writerow(it)

if __name__ == '__main__':
    exp=FullExport(sys.argv[1])
    exp.export(sys.argv[2])
