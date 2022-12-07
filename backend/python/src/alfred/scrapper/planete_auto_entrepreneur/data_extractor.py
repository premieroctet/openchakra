# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''
from alfred.scrapper.data_extractor import DataExtractor
from os.path import join
from alfred.misc.utils import get_data_dir
from alfred.scrapper.planete_auto_entrepreneur.url_generator import PlaneteAutoGenerator
from alfred.scrapper.planete_auto_entrepreneur.l1_parser import L1PlaneteAutoParser

if __name__ == '__main__':
	DataExtractor(PlaneteAutoGenerator(), L1PlaneteAutoParser, fname).extract()
