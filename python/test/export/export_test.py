# -*- coding: utf-8 -*-
'''
Created on 11 août 2019

@author: seb
'''
import unittest
from alfred.db_export.full_export import FullExport



class ExportTest(unittest.TestCase):


    def testExport(self):
        exp = FullExport('test-myAlfred')
        exp.export("/tmp/test.csv")

if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testLoad']
    unittest.main()