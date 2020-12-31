# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''
from alfred.scrapper.mon_presta.parser import MonPrestaParser
from os.path import join
from alfred.misc.utils import get_data_dir
from alfred.scrapper.mon_presta.url_generator import MonPrestaGenerator
from alfred.scrapper.utils.extractor import DataExtractor

if __name__ == '__main__':
	fname = join(get_data_dir(), "mon-presta.csv")
	DataExtractor(MonPrestaGenerator, MonPrestaParser, fname).extract()
