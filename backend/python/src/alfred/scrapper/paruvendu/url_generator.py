# coding=UTF-8
'''
Created on 6 mars 2013

@author: sauvray
'''
from os.path import join
from alfred.misc.utils import get_data_dir
from alfred.scrapper.utils.loader import BasicLoader

class ParuVenduGenerator():

	BASE_URL = 'https://www.paruvendu.fr/animmos/listefo/default/default?fulltext=&idtag=&elargrayon=1&ray=50&lo=&codeINSEE=&cp=&pa=FR&chaine=L&rfam=&typeService=&p={}'

	def __init__(self, url_loader):
		self._page_index = 0
		self._deps_index = 0
		self.url_loader = url_loader

	def __iter__(self):
		return self

	def page(self):
		return self._page_index
	
	def url_exists(self, url):
		driver = self.url_loader.load_url(url)
		return 'txtannonce' in driver.page_source

	def __next__(self):
		self._page_index += 1
		url = self.BASE_URL.format(self._page_index)
		if self.url_exists(url):
			return url
		else:
			raise StopIteration()
		
