'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase
from alfred.database.db_access import DBAccess
from alfred.misc.utils import get_item

""" Updates services and categories pictures """ 
class UpdatePictures(object):
    
    def __init__(self, source_db, dest_db):
      super().__init__()
      self.source_db=DBAccess(source_db)
      self.dest_db=DBAccess(dest_db)
      
    def fix(self):
      for docs in 'categories services'.split():
        sourceDocs = sorted(self.source_db.get_items(docs), key=lambda d : d['label']) 
        destDocs = sorted(self.dest_db.get_items(docs), key=lambda d : d['label'])
        for s in sourceDocs:
          d = get_item(destDocs, s['_id'])
          if not d:
            raise Exception('Pas trouvé')
          if s.label!=d.label or s.picture!=d.picture:
            print('Changing {} {}'.format(docs, s._id))
            d.label = s.label
            d.picture = s.picture
            self.dest_db.update_document(docs, d)
          
        
if __name__ == '__main__':
    UpdatePictures(sys.argv[1], sys.argv[2]).fix()
