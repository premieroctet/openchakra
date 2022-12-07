'''
Created on 15 sept. 2020

@author: seb
'''
import unittest
from alfred.scrapper.leboncoin.url_generator import LeBonCoinGenerator
from alfred.scrapper.leboncoin.parser import LeBonCoinParser
from alfred.scrapper.utils.extractor import DataExtractor
from alfred.scrapper.paruvendu.url_generator import ParuVenduGenerator
from alfred.scrapper.paruvendu.parser import ParuVenduParser


class Test(unittest.TestCase):

  def testParuVendu(self):
    DataExtractor(ParuVenduGenerator, ParuVenduParser, "").extract()


if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testLBC']
    unittest.main()