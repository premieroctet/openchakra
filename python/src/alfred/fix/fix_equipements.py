'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase
from os.path import join, isfile

class FixEquipements(FixBase):
  
  ROOT="/Users/seb/workspace/myAlfred/web/static/equipments"
    

  def fix(self):
    all_equipements = self.db.get_items("equipment")
    missing=0
    for a in all_equipements:
      path = join(self.ROOT, a.logo)
      exists= isfile(path)
      print("{}: {} {}".format(a.label, path, exists))
      if not exists:
        missing+=1
    print("missing:{}, all:{}".format(missing, len(all_equipements)))
                    
if __name__ == '__main__':
    FixEquipements(sys.argv[1]).fix()
    