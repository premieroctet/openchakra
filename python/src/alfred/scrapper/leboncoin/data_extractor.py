# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''
from os.path import join
from alfred.misc.utils import get_data_dir
from alfred.scrapper.leboncoin.url_generator import LeBonCoinGenerator
from alfred.scrapper.leboncoin.parser import LeBonCoinParser
from alfred.scrapper.utils.extractor import DataExtractor

if __name__ == '__main__':
	fname = join(get_data_dir(), "cenior.csv")
	DataExtractor(LeBonCoinGenerator, LeBonCoinParser, fname).extract()
