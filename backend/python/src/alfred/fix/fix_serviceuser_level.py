'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixServiceUserLevel(FixBase):

    MAPPING={
      None: 0,
      '': 0,
      "ZeroOrOne":1,
      "OneToFive":2,
      "FiveToTen":3,
      "MoreThanTen":4
    }
    
    def fix(self):
        services = self.db.get_items("serviceusers")
        for s in services:
          orgLevel=s.get('level', None)
          if isinstance(orgLevel, int):
            continue
          if isinstance(orgLevel, float):
            mappedLevel=int(orgLevel)
          else:
            mappedLevel=self.MAPPING[orgLevel]
          print("{}=>{}".format(orgLevel, mappedLevel))
          self.db.update_document("serviceusers", { "_id" : s._id, "level": mappedLevel})
        
if __name__ == '__main__':
    FixServiceUserLevel(sys.argv[1]).fix()
