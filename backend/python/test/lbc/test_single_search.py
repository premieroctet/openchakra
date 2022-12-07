'''
Created on 13 mai 2019

@author: neo
'''
import unittest
from lbc.configuration import Configuration
try:
	from urllib.request import Request, build_opener
except ImportError:
	from urllib2 import Request, build_opener
try:
	from urllib.parse import urlencode
except ImportError:
	from urllib import urlencode
from lbc.model.prospect import Prospect


class ParsingTest(unittest.TestCase):


	def test_search(self):
		headers = {
			"Accept": "application/json",
			"Content-Type": "application/x-www-form-urlencoded",
			"Origin": "https://www.leboncoin.fr",
			"Referer": "https://www.leboncoin.fr/prestations_de_services/1602473024.htm/",
			"User-Agent": Configuration().get_headers()['User-Agent'],
			"referrer-policy": "no-referrer-when-downgrade",
		}
		data = {
			"app_id": "leboncoin_web_utils",
			"key": "54bb0281238b45a03f0ee695f73e704f",
			"list_id": "1565686782",
			"text": "1",
		}
		js_data = urlencode(data).encode("ascii")
		r=Request("https://api.leboncoin.fr/api/utils/phonenumber.json", headers=headers, data=js_data)
		contents = build_opener().open(r).read()
		print(contents)
		
	def test_exists(self):
		self.assertTrue(Prospect.url_exists("https://www.leboncoin.fr/cours_particuliers/1621580563.htm/"))

if __name__ == "__main__":
	#import sys;sys.argv = ['', 'Test.testParse']
	unittest.main()