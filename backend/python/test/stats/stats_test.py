# -*- coding: utf-8 -*-
'''
Created on 11 août 2019

@author: seb
'''
import unittest
from stats.stats import Stats
from pprint import  pprint
from os.path import join
from lbc.utils import get_data_dir
from numpy import mean, std


class StatsTest(unittest.TestCase):


    def testLoad(self):
        s = Stats(join(get_data_dir(), "all-services.xlsx")).load()
        num_services = [(cat, len(services)) for cat, services in s.items()]
        num_prestations = []
        for cat, services in s.items():
          for service, prestations in services.items():
            num_prestations.append((service, len(prestations)))
        #print(mean(num_services), std(num_services), min(num_services), max(num_services))
        #print(mean(num_prestations), std(num_prestations), min(num_prestations), max(num_prestations))
        print(sorted(num_services, key=lambda (n,v):v))
        print(sorted(num_prestations, key=lambda (n,v):v))
        
    def testOrtho(self):
      words = set()
      s = Stats(join(get_data_dir(), "all-services.xlsx")).load()
      for cat, services in s.items():
        words=words.union(cat.lower().split())
        for service, prestations in services.items():
          words=words.union(service.lower().split())
      print("\n".join(words))


if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testLoad']
    unittest.main()