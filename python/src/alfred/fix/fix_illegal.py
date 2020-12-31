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
from alfred.misc.consts import PHONE_MAIL_PATTERN

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
    FILTER={
      'users' : ['description',] ,
      'serviceusers' : ['description',] ,
      'shops' : ['welcome_message',] ,
    }
    
    def fix(self):
      patts = [re.compile(PHONE_MAIL_PATTERN)]
      for doc_type, fields in self.FILTER.items():
        for item in self.db.get_items(doc_type):
          for field in fields:
            for sub_field in field.split('.'):
              f = item.get(sub_field)
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
