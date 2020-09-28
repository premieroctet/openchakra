'''
Created on 15 sept. 2020

@author: seb
'''
from urllib import request
from http.cookiejar import CookieJar
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.common.by import By
from pprint import pprint

class BasicLoader(object):
    headers = [
      ('Host', 'www.leboncoin.fr'),
      ('Connection', 'keep-alive'),
      ('User-Agent', 'Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'),
      ('Accept', '*/* '),
      ('Accept-Encoding', 'gzip, deflate, br'),
      ('Accept-Language', 'en-US,en;q=0.9,fr;q=0.8"""'),
    ]

    def __init__(self):
      cj = CookieJar()
      opener = request.build_opener(request.HTTPCookieProcessor(cj))
      opener.addheaders = self.headers
      request.install_opener(opener)
    
    def load_url(self, url, headers=None):
      r=request.Request(url)
      print("Opening {}".format(url))
      print(r.headers)
      result = request.urlopen(url)
      data = result.read()
      return data
    
class ChromeLoader(object):
  
  def load_url(self, url, headers=None):
    chrome_options = Options()  
    #chrome_options.add_argument("--headless")  
    chrome_options.binary_location = '/usr/bin/google-chrome-stable'
    chrome_options.remote_debugging_port=1111
    chrome_options.debugger_address = "127.0.0.1:1111"    
    
    driver = webdriver.Chrome(ChromeDriverManager().install())  
    driver.get("https://www.leboncoin.fr")
    input("Cliquez quand vous êtes sur la page de recherche")
    # Elements inputs recherche
    search_fields=[i for i in driver.find_elements_by_tag_name('input') if "Que rech" in i.get_attribute('placeholder')]
    # Dans lequel saisir la recherche ?? Amène systématiquement à un "Je ne suis pas un robot"
    search_field.enter_keys('Ma recherche')
    # Cliquer sur le svg loupe ne fonctionne pas. Lequel choisir ?
    loupes = [i for i in driver.find_elements_by_tag_name('svg')]
    loup.click()
    
    