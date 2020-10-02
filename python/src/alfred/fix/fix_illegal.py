'''
Created on 5 mars 2020

@author: seb
'''
import sys
from datetime import datetime
from dateutil.relativedelta import relativedelta
import tzlocal
import pytz
from alfred.fix.fix_base import FixBase
import re
from alfred.misc.consts import PHONE_MAIL_PATTERNS

"""
Fix illegal :
 - suppression n° de téléphone
 - suppression emails
 - suppression noms d'entreprises
"""
class FixIllegal(FixBase):

    """
    FIELDS='description label'.split()
    DOCUMENTS='serviceusers users prestations'.split()
    """
    FIELDS=['description']
    DOCUMENTS=['users', 'serviceusers']
    
    def fix(self):
      patts = [re.compile(p) for p in PHONE_MAIL_PATTERNS]
      for doc_type in self.DOCUMENTS:
        for item in self.db.get_items(doc_type):
          for field in self.FIELDS:
            f = item.get(field)
            if f:
              for patt in patts:
                result=patt.search(f)
                if result:
                  #print(patt," in ", item.get(field))
                  print("*******"+result.group(0))
                  f=patt.sub('[Masqué]', f)
                  print(f)
                item[field]=f
              self.db.update_document(doc_type, item)
                  
    
if __name__ == '__main__':
    FixIllegal(sys.argv[1]).fix()
