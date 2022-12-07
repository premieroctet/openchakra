# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''
from alfred.scrapper.base_parser import BaseParser
from bs4 import BeautifulSoup
from urllib.parse import urljoin

class LeBonCoinParser(BaseParser):

	def __init__(self, loader, url):
		BaseParser.__init__(self, loader, url)

	def get_contact_info(self, div):
		url = urljoin("http://www.cenior.fr/", div['href'])
		try:
			html_contents = str(self.loader.load_url(url), encoding='utf-8')
			bs = BeautifulSoup(html_contents, features="lxml")
			nom = bs.find("span", class_="nom").text.strip()
			
			fonction = bs.find("h2", class_="intitule").text.strip()
			
			adresse_div = bs.find("span", class_="adresse")
			adresse = adresse_div.text.strip() if adresse_div else None
			
			phone_div = bs.find("span", class_="telephone")
			phone = phone_div.find('a').text.strip() if phone_div else None

			mail = None
			mail_div = bs.find("span", class_="email")
			if mail_div:
				mail_a = mail_div.find('a')
				if mail_a:
					children = list(mail_a.children)
					if len(children)==3:
						mail = children[0]+"@"+children[2]
					
			site_div = bs.find("span", class_="url")
			site = site_div.find('a')['href'] if site_div else None
			
			return [nom, fonction, adresse, phone, mail, site]
		except Exception as e:
			print("{}:{}".format(url, e))
			return None

	def get_page_data(self, html_contents):
		bs = BeautifulSoup(html_contents, features="lxml")
		divs = bs.find_all('a', class_='fiche-entrepreneur-extrait-lite')
		divs =  [d for d in divs if d.find('span', class_='nom')]
		return [self.get_contact_info(div) for div in divs]
