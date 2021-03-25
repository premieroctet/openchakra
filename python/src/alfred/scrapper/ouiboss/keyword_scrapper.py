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
from itertools import permutations
import os

INPUT_ID=re.compile('downshift-.*-input')
BUTTON_CLASS='Button__StyledButton-coexwk-0 hKjnMB SearchBar__SearchButton-sc-10r3emu-7 drJmxA'
MENU_CLASS='Autocomplete__Menu-sc-109v32z-2 fRIBbM'
	

def get_keywords(driver, element, pattern):
	element.send_keys(Keys.BACK_SPACE*len(pattern))
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
	driver.implicitly_wait(2)
	driver.get("https://ouiboss.com/")
	elements = [e for e in driver.find_elements_by_tag_name('input') if INPUT_ID.search(e.get_attribute('id'))]
	elements = sorted(elements, key=lambda e :e.get_attribute('id'))
	
	filename = os.path.expanduser('~/ouiboss_keywords.txt')
	alphabet=[chr(i) for i in range(ord('a'), ord('z')+1)]

	keywords=set()
	
	for size in range(2, 26):
		for word in permutations(alphabet, size):
			try:
				keywords=keywords.union(get_keywords(driver, elements[0], word))
				print(keywords)
				print(len(keywords))
				with open(filename, 'w') as output:
					print(keywords)
					output.write('\n'.join(sorted(keywords)))
					print('Saved to {}'.format(filename))
			except Exception as e:
				print(str(e))
				print('Erreur pour {}'.format(word))
	print(keywords)
