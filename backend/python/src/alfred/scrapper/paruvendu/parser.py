# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''
from alfred.scrapper.base_parser import BaseParser
import time
from alfred.scrapper.utils.utils import DELAY
from bs4 import BeautifulSoup

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
		urls = [d.get_attribute('href') for d in driver.find_elements_by_xpath("//a[not(contains(@href, 'javascript')) and parent::div[contains(@class, 'ergov3-annonce')]]")]
		index = 0
		res=[]
		print('{} annonces trouvées'.format(len(urls)))
		for url in urls:
			print("Sous-page:{}".format(index))
			announce_infos = self.get_contact_info(url)
			if announce_infos:
				res.append(announce_infos)
			index+=1	
		return res
