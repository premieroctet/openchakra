'''
Created on 5 mars 2020

@author: seb
'''
import sys
import requests
from alfred.fix.fix_base import FixBase

class FixSiret(FixBase):

    SHOPS_FORCE_PARTICULIERS=['5e5e2517733a3e4d9df88e69', '5e1b1695b9a2462bc340c68c', '5e7bf4e527c45b32b172b315', '5e695b3b49342b093b96bbf7',
                              '5e52790693ade4217fd3c8e4', '5e63d2531bee64541cfc0794']
    
    def get_siret_info(self, siret):
      r=requests.get('https://entreprise.data.gouv.fr/api/sirene/v1/siret/{}'.format(siret))
      print(r.status_code)
      resp = r.json()['etablissement']
      print(resp.keys())
      dt = resp['date_creation']
      dt="{}/{}/{}".format(dt[6:8], dt[4:6], dt[:4])
      company={
        "name": resp['l1_normalisee'],
        "nafape": resp['activite_principale'],
        "status": resp['libelle_nature_juridique_entreprise'],
        "creationDate": dt,
        "siret": siret
      }
      return company
      
    def fix(self):
        shops = self.db.get_items("shops")
        for s in shops:
          if str(s._id) in self.SHOPS_FORCE_PARTICULIERS:
            self.db.update_document("shops", {"_id" : s._id, "is_particular": True, "is_professional":False, "company": None})
            continue
          part = s.is_particular
          company = s.get('company', None)
          if part and company:
            print("Suppression compagnie de {} : particulier avec compagnie : {}".format(s._id, company))
            s.company=None
            self.db.update_document("shops", {"_id" : s._id, "company" : s.company})
          if not part and not company:
            print("Search for {}/ user {}".format(s._id, s.alfred))
            if not str(s._id) in self.sirets:
                print("Not found {}".format(s._id))
            else:
              company=self.get_siret_info(self.sirets[str(s._id)])
              self.db.update_document("shops", {"_id": s._id, "company": company})
            
        
if __name__ == '__main__':
    FixSiret(sys.argv[1]).fix()