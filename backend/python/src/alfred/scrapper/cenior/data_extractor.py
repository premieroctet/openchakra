# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''
from alfred.scrapper.data_extractor import DataExtractor
from alfred.scrapper.cenior.url_generator import CeniorGenerator
from alfred.scrapper.cenior.parser import CeniorParser
from os.path import join
from alfred.misc.utils import get_data_dir

if __name__ == '__main__':
	fname = join(get_data_dir(), "cenior.csv")
	DataExtractor(CeniorGenerator, CeniorParser, fname).extract()
