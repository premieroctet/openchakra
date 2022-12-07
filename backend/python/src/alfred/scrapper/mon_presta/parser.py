# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''
from alfred.scrapper.base_parser import BaseParser
from bs4 import BeautifulSoup

class MonPrestaParser(BaseParser):

	def __init__(self, url):
		BaseParser.__init__(self, url)

	def get_contact_info(self, div):
		name = div.find('h2', itemprop="name").text.strip()
		
		function = div.find('p', class_="mb-5").text.strip()
		address = div.find('p', class_="address").text.strip() 
		address = address.replace("\n", "")
		while "  " in address:
			address = address.replace("  ", " ")
			
		phone_url = div.find('a', class_="call")
		phone = phone_url['href'].replace("tel:", "") if phone_url else None
		
		site_url = div.find("a", class_="site-url")
		site = site_url['href'] if site_url else None
		
		return [name, function, address, phone, site]

	def get_page_data(self, html_contents):
		bs = BeautifulSoup(html_contents, features="lxml")
		divs = bs.find_all('div', class_='panel')
		divs =  [d for d in divs if d.find('h2')]
		return [self.get_contact_info(div) for div in divs]
