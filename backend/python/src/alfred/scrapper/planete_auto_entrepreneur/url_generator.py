# coding=UTF-8
'''
Created on 6 mars 2013

@author: sauvray
'''
from alfred.lbc.loader import Loader
from alfred.scrapper.planete_auto_entrepreneur.l1_parser import L1PlaneteAutoParser
from alfred.scrapper.planete_auto_entrepreneur.l2_parser import L2PlaneteAutoParser
from alfred.scrapper.planete_auto_entrepreneur.l3_parser import L3PlaneteAutoParser
from alfred.scrapper.planete_auto_entrepreneur.l4_parser import L4PlaneteAutoParser

class PlaneteAutoGenerator():

	BASE_URL = 'https://annuaire.planete-auto-entrepreneur.com/'

	def __init__(self, url_loader):
		self._page_index = 0
		self._deps_index = 0
		self.url_loader = url_loader
		urls = L1PlaneteAutoParser(url_loader, self.BASE_URL).extract_data()
		"""
		urls3 = []
		for u in urls:
			print(u)
			urls2 = L2PlaneteAutoParser(url_loader, 'https://annuaire.planete-auto-entrepreneur.com/{}'.format(u)).extract_data()
			for u2 in urls2:
				print(u2)
				urls3 += L3PlaneteAutoParser(url_loader, 'https://annuaire.planete-auto-entrepreneur.com/{}'.format(u2)).extract_data()
				open("/tmp/auto/urls3", "w").write("\n".join(urls3))	
			
		"""
		urls3 = [l.strip() for l in open('/tmp/auto/urls3').readlines()]

		
		infos=[]
		for url in urls3:
			print(url)
			try:
				info=L4PlaneteAutoParser(url_loader, url).extract_data()
				print(info)
				infos.append(";".join(map(str, info)))
				open("/tmp/auto/infos", "w").write("\n".join(map(str, infos)))
			except Exception as e:
				print(e)
		print(infos)
		#self.urls_it = iter(urls3)

	def __iter__(self):
		return self

	def __next__(self):
		return next(self.urls_it)

if __name__ == '__main__':
	for url in PlaneteAutoGenerator(Loader()):
		pass
		#print(url)