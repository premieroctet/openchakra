# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''
from alfred.scrapper.base_parser import BaseParser
from bs4 import BeautifulSoup
import re

REGEXP = re.compile("-[0-9]+\.html")

class L1PlaneteAutoParser(BaseParser):

	def __init__(self, loader, url):
		BaseParser.__init__(self, loader, url)

	def get_page_data(self, html_contents):
		bs = BeautifulSoup(html_contents, features="html.parser")
		divs = bs.find_all('a')
		divs = [d for d in divs if list(d.attrs.keys())==['href']]
		divs = [d for d in divs if REGEXP.search(d['href'])]
		return [d['href'] for d in divs]
