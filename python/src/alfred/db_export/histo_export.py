import os
import sys

from alfred.database.db_access import DBAccess
from csv import writer
from _collections import defaultdict
import locale
from _locale import LC_ALL

locale.setlocale(LC_ALL, "french")

class HistoExport(object):

    def __init__(self, db_name):
        super(object, self).__init__()
        self.db = DBAccess(db_name)

    def export(self, directory):
      datas=[self.db.get_items('users'), [a for a in self.db.get_items('users') if a.is_alfred]]   
      filenames=["export_histo_users.csv", "export_histo_alfred.csv"]   

      keys = 'date nombre'.split()
      for data, filename in zip(datas, filenames):
        out = open(os.path.join(directory, filename), "w", encoding='utf-8')
        
        
        d=defaultdict(list)
        dates = set((u.creation_date.date() for u in data))
        print(dates)
        date_count=dict( (d, len([u for u in data if u.creation_date.date()<=d])) for d in dates )
        print(date_count)
        rows=[]
        for k, v in sorted(date_count.items()):
          rows.append([k.strftime('%x'), v])

        wr=writer(out, delimiter=";")
        wr.writerow(keys)
        wr.writerows(rows)

if __name__ == '__main__':
    exp=HistoExport(sys.argv[1])
    exp.export(sys.argv[2])
