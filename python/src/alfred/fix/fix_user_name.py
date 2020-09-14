'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixUserName(FixBase):

    def fix(self):
        users = self.db.get_items("users")
        for u in users:
          prenom, nom = u.firstname, u.name
          if not prenom:
            print("Sans prénom:{}".format(u._id))
          elif prenom[0].islower() or prenom[1:]!=prenom[1:].lower() or prenom.strip()!=prenom:
            print("Prénom en min : {}".format(prenom))
            prenom=(prenom[0].upper()+prenom[1:].lower()).strip()
            self.db.update_document("users", { "_id" : u._id, "firstname" : prenom})
          if not nom:
            print("Sans nom:{}".format(u._id))
          elif nom[0].islower() or nom[1:]!=nom[1:].lower() or nom.strip()!=nom:
            print("Nom en min : {}".format(nom))
            nom=(nom[0].upper()+nom[1:].lower()).strip()
            self.db.update_document("users", { "_id" : u._id, "name" : nom})
          
if __name__ == '__main__':
    FixUserName(sys.argv[1]).fix()
