'''
Created on 15 mars 2020

@author: seb
'''
from urllib.parse import quote
import json
from urllib.request import urlopen

class AddressDataGPS(object):

  URL = "https://api-adresse.data.gouv.fr/search/?q={}"
    
  def resolve(self, address):
      address = address.strip()
      address=quote(address.encode('utf8'))
      url = self.URL.format(address)
      contents = json.loads(urlopen(url).read())
      try:
          coords = contents['features'][0]['geometry']['coordinates']
          gps={'lat': coords[1], 'lng': coords[0]}
          return gps
      except Exception as e:
        print(e)
        return None
    
class OpenCageGPS(object):

  KEY = '0c9b4dd8f91642bcafb59c1b55123561'
  URL = 'https://api.opencagedata.com/geocode/v1/json?q={{}}&key={}'.format(KEY)

  def resolve(self, address):
      address = address.strip()
      address=quote(address.encode('utf8'))
      url = self.URL.format(address)
      contents = json.loads(urlopen(url).read())
      try:
          coords = contents['results'][0]['geometry']
          gps={'lat': coords['lat'], 'lng': coords['lng']}
          return gps
      except Exception as e:
        print(e)
        return None


if __name__ == '__main__':
    print(AddressDataGPS().resolve("de Loncin, 86, Awans,Belgique"))
    print(OpenCageGPS().resolve("de Loncin, 86, Awans,Belgique"))
    print(OpenCageGPS().resolve("260, rue louis blanc, rouen, france"))
    