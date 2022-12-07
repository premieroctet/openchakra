# coding=UTF-8
'''
Created on 6 mars 2013

@author: sauvray
'''
class MonPrestaGenerator():

	BASE_URL = 'https://mon-presta.fr/annuaire/recherche?location=&page={}&q=&search='

	def __init__(self, url_loader):
		self._index = 1
		self.url_loader = url_loader

	def __iter__(self):
		return self

	def url_exists(self, url):
		data = str(self.url_loader.load_url(url, headers=None), encoding="utf-8")
		return 'div class="panel-body"' in data

	def __next__(self):
		url = self.BASE_URL.format(self._index)
		if self.url_exists(url):
			self._index += 1
			return url
		else:
			raise StopIteration()

