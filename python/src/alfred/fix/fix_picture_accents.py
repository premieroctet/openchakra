'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase
import os

"""
Update services:
 - tout service proposé chez le client peut potentiellement avoir des frais de déplacement
 - tout service proposé chez l'alfred peut potentiellement avoir des frais de retrait/livraison
"""
class FixPictureAccents(FixBase):

    DOCUMENTS='categories services prestations'.split()
    
    def fix(self):
      for doc_type in self.DOCUMENTS:
        
        items = self.db.get_items(doc_type)
        for item in items:
          pic=item.get('picture', None)
          if pic:
            if pic.startswith('/'):
              pic=pic[1:]
            full_path=os.path.join(os.path.expanduser("~/workspace/myAlfred_v2"), pic)
            if not os.path.isfile(full_path):
              print("ERR on {}".format(full_path))
          
    
if __name__ == '__main__':
    FixPictureAccents(sys.argv[1]).fix()