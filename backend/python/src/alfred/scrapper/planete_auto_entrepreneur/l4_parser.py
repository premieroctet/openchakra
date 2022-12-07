# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''
from alfred.scrapper.base_parser import BaseParser
from bs4 import BeautifulSoup
import re

REGEXP = re.compile("annuaire.planete.*/[0-9]+")

FIXE = re.compile("fixe *: *([0-9]+)")
MOBILE = re.compile("Mobile *: *([0-9]+)")

class L4PlaneteAutoParser(BaseParser):

	def __init__(self, loader, url):
		BaseParser.__init__(self, loader, url)

	def get_page_data(self, html_contents):
		bs = BeautifulSoup(html_contents, features="html.parser")
		divs = bs.find_all('table')
		div = [d for d in divs if 'Pour me contacter' in d.text and d.get('width', '')=='204']
		div = div[0 ] if div else None
		#divs = [d for d in divs if REGEXP.search(d['href'])]
		if div:
			mail = [a for a in div.find_all('a') if 'mailto' in a.get('href', '')]
			mail = mail[0] if mail else ''
			mail = mail['href'].replace('mailto:', '') if mail else ''
			
			fixe = div.find('p').text
			fixe=FIXE.search(fixe)
			fixe = fixe.group(1) if fixe else ''

			mobile = div.find('p').text
			mobile = MOBILE.search(mobile)
			mobile = mobile.group(1) if mobile else ''
		
		name=[h for h in bs.find_all('h1') if h.text!='']
		name = list(name[0].children)[0] if name else ''
		
		activite = bs.find_all(style = lambda s : s  and 'color:#6532a8' in s)
		activite = activite[0].text if activite else ''
		
		res = [name, activite, mail, fixe, mobile]
		
		return res
