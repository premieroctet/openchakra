'''
Created on 13 mai 2019

@author: neo
'''
import unittest
import os
from alfred.misc.utils import get_data_dir
from alfred.lbc.parser import HtmlParser

class ParsingTest(unittest.TestCase):


	def testParse(self):
		for fname in ('prestation_services.html',):
			full_path = os.path.join(get_data_dir(), fname)
			contents = open(full_path, "r").read()
			item_parser = HtmlParser(contents)
			title = item_parser.get_title()
			city = item_parser.get_city()
			name = item_parser.get_name()
			post_date = item_parser.get_date()
			self.assertIsNotNone(title) 
			self.assertIsNotNone(city) 
			self.assertIsNotNone(name) 
			self.assertIsNotNone(post_date) 

if __name__ == "__main__":
	#import sys;sys.argv = ['', 'Test.testParse']
	unittest.main()
