'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixServiceUserDiplomaCertification(FixBase):

    # A diploma or certification is valid if name and year are not null 
    def isDocumentValid(self, doc):
      result = False;
      if doc is not None:
        if doc.get('year', None) and doc.get('name', None):
          result = True
      #print("{} is valid:{}".format(doc, result))
      return result
        
    def fix(self):
        serviceusers = self.db.get_items("serviceusers")
        for field in 'diploma certification'.split():
          invalid_services = [s for s in serviceusers if not self.isDocumentValid(s.get(field, None))]
          for su in invalid_services:
            print('Invalid {} for {}'.format(field, su.get(field)))
            setattr(su, field, None)
            setattr(su, 'graduated' if field=='diploma' else 'is_certified', False)
            self.db.update_document("serviceusers", su)
        
if __name__ == '__main__':
    FixServiceUserDiplomaCertification(sys.argv[1]).fix()

