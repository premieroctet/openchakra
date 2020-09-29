# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''
from alfred.scrapper.base_parser import BaseParser
from bs4 import BeautifulSoup
import time
from alfred.scrapper.utils.utils import DELAY

class ParuVenduParser(BaseParser):

	def __init__(self, loader, url):
		BaseParser.__init__(self, loader, url)
	
	def get_element_text(self, element):
		return element.text.strip() if element else ''
		
	def get_contact_info(self, url):
		try:
			res={}
			driver = self.loader.load_url(url)
			tels = [a for a in driver.find_elements_by_tag_name('a') if a.get_attribute('url') and 'contactpartel' in a.get_attribute('url')]
			if tels:
				tels[0].click()
				time.sleep(DELAY)
				res['tel']=self.get_element_text(driver.find_element_by_id('tel_1'))
			else:
				return None
			html_contents = driver.page_source
			bs = BeautifulSoup(html_contents, features="lxml")
			res['titre'] = self.get_element_text(bs.find("h1", class_="auto2012_dettophead1txt1"))
			res['address'] = self.get_element_text(bs.find("h2", class_="auto_pv_detTophead1Txt3 flol"))
			res['name'] = self.get_element_text(bs.find("p", class_="txtpresentation-vendeur"))
			return res
		except Exception as e:
			print("{}:{}".format(url, e))
			return None

	def get_page_data(self, driver):
		bs = BeautifulSoup(driver.page_source, features="lxml")
		divs = bs.find_all('div', class_='ergov3-annonce')
		urls = [ a['href'] for a in (div.find(lambda d : 'javascript' not in d.get('href', None)) for div in divs)]
		index = 0
		res=[]
		for url in urls:
			print("Sous-page:{}".format(index))
			res.append(self.get_contact_info(url))
			index+=1	
		return res
