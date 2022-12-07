'''
Created on 15 sept. 2020

@author: seb
'''
import unittest
from alfred.scrapper.leboncoin.url_generator import LeBonCoinGenerator
from alfred.scrapper.leboncoin.parser import LeBonCoinParser
from alfred.scrapper.utils.extractor import DataExtractor


class Test(unittest.TestCase):


    def testLBC(self):
        DataExtractor(LeBonCoinGenerator, LeBonCoinParser, "").extract()


if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testLBC']
    unittest.main()