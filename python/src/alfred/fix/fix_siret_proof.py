'''
Created on 5 mars 2020

@author: seb
'''
import requests
import sys
from bs4 import BeautifulSoup
from alfred.fix.fix_base import FixBase

class FixSiretProof(FixBase):

    def get_siret_proof(self, siret):
      siren=siret[:9]
      siren="{} {} {}".format(siren[:3], siren[3:6], siren[6:9] )
      data={
        "form.siren": siren,
        "form.critere": "S",
        "form.nic": '',
        "form.departement": '',
        "form.departement_actif": '',
      }
      print(data)
      session = requests.session()
      session.get("https://avis-situation-sirene.insee.fr/")
      r=session.post('https://avis-situation-sirene.insee.fr/IdentificationListeSiret.action', data)
      bs = BeautifulSoup(r.text, features="html.parser")
      a = bs.find("form", id="AvisPdf")
      data={}
      for child in a.find_all('input', type='hidden'):
        data[child.attrs['name']]=child.attrs['value']
      print(data)
      r=session.post('https://avis-situation-sirene.insee.fr/AvisPdf.action', data)
      print(r.text)
      """
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
      """
      
    def fix(self):
        shops = self.db.get_items("shops")
        for s in shops:
          if s.get('company', None):
            siret = s.company['siret']
            doc = self.get_siret_proof(siret)
            break
            
        
if __name__ == '__main__':
    FixSiretProof(sys.argv[1]).fix()