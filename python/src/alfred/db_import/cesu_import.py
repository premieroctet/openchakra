import os
import sys

from alfred.database.db_access import DBAccess
from alfred.misc.utils import get_item, get_items
from csv import writer, DictReader


class CesuImport(object):

    def __init__(self, db_name):
        super(object, self).__init__()
        self.db = DBAccess(db_name)

    def import_file(self, data_file):
      prestations = self.db.get_items('prestations')

      input_ = open(data_file, encoding='utf-8')
      reader=DictReader(input_, delimiter=";")
      
      for item in reader:
        label=item['prestation']
        cesu=int(item['eligible_cesu'])
        print(label, cesu)
        prestas=get_items(prestations, label, 'label')
        if (len(prestas)==0):
          print('************* Pas de prestation pour {}'.format(label))
        for p in prestas:
          p['cesu_eligible']= cesu==1
          self.db.update_document('prestations', p)
        
if __name__ == '__main__':
    exp=CesuImport(sys.argv[1])
    exp.import_file(sys.argv[2])
