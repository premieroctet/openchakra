# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''

from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from pprint import pprint
import time
from selenium.webdriver.common.by import By
import re
from selenium.webdriver.common.keys import Keys

INPUT_ID=re.compile('downshift-.*-input')
BUTTON_CLASS='Button__StyledButton-coexwk-0 hKjnMB SearchBar__SearchButton-sc-10r3emu-7 drJmxA'
MENU_CLASS='Autocomplete__Menu-sc-109v32z-2 fRIBbM'
	

def get_keywords(driver, element, pattern):
	element.send_keys(Keys.BACK_SPACE)
	time.sleep(1)
	element.send_keys(pattern)
	time.sleep(1)
	all_elements = driver.find_elements_by_xpath("//div")
	menu = next((e for e in all_elements if e.get_attribute('class')==MENU_CLASS), None)
	siblings=menu.find_elements_by_xpath(".//*")
	kwds=set([s.text for s in siblings])
	print('{}: {} trouvés'.format(pattern, len(kwds)))
	return kwds

if __name__ == '__main__':
		
	chrome_options = Options()  
	#chrome_options.add_argument("--headless")  
	chrome_options.binary_location = '/usr/bin/google-chrome-stable'
	chrome_options.remote_debugging_port=1111
	chrome_options.debugger_address = "127.0.0.1:1111"    
	
	driver = webdriver.Chrome(ChromeDriverManager().install())
	driver.get("https://ouiboss.com/")
	elements = [e for e in driver.find_elements_by_tag_name('input') if INPUT_ID.search(e.get_attribute('id'))]
	elements = sorted(elements, key=lambda e :e.get_attribute('id'))
	keywords=set()
	for char in range(ord('a'), ord('z')+1):
		try:
			keywords=keywords.union(get_keywords(driver, elements[0], chr(char)))
			print(keywords)
		except:
			print('Erreur pour {}'.format(chr(char)))
	print(keywords)
	
	
	