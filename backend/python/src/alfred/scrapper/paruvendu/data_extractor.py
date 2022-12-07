# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''

from os.path import join
from alfred.misc.utils import get_data_dir
from alfred.scrapper.utils.extractor import DataExtractor
import sys
from alfred.scrapper.paruvendu.parser import ParuVenduParser
from alfred.scrapper.paruvendu.url_generator import ParuVenduGenerator

if __name__ == '__main__':
	print(sys.executable)
	fname = join(get_data_dir(), "cenior.csv")
	DataExtractor(ParuVenduGenerator, ParuVenduParser, fname).extract()
