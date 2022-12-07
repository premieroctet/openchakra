# coding=UTF-8
'''
Created on 6 mars 2013

@author: sauvray
'''
from os.path import join
from alfred.misc.utils import get_data_dir

class LeBonCoinGenerator():

	BASE_URL = 'https://www.leboncoin.fr'

	def __init__(self, url_loader):
		self._departements = [d.strip() for d in open(join(get_data_dir(), "departements.txt")).readlines()]
		self._page_index = 0
		self._deps_index = 0
		self.url_loader = url_loader

	def __iter__(self):
		return self

	def url_exists(self, url):
		data = str(self.url_loader.load_url(url, headers=None), encoding="utf-8")
		return 'fiche-entrepreneur-extrait-lite' in data

	def __next__(self):
		url = self.BASE_URL.format(self._departements [self._deps_index], self._page_index)
		if self.url_exists(url):
			self._page_index += 1
			return url
		else:
			# Soit plus de page pour le département, soit plus de département
			if self._departements[self._deps_index] == self._departements[-1]:
				raise StopIteration()
			self._deps_index += 1
			self._page_index = 0
			return self.__next__()
