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
from alfred.scrapper.utils.utils import DELAY

class BasicLoader(object):
  
    '''
    headers = [
      ('Host', 'www.leboncoin.fr'),
      ('Connection', 'keep-alive'),
      ('User-Agent', 'Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'),
      ('Accept', '*/* '),
      ('Accept-Encoding', 'gzip, deflate, br'),
      ('Accept-Language', 'en-US,en;q=0.9,fr;q=0.8"""'),
    ]
    '''
    headers = []

    def __init__(self):
      cj = CookieJar()
      opener = request.build_opener(request.HTTPCookieProcessor(cj))
      opener.addheaders = self.headers
      request.install_opener(opener)
    
    def load_url(self, url, headers=None):
      time.sleep(0.5)
      r=request.Request(url)
      print(r.headers)
      result = request.urlopen(url)
      data = result.read()
      return data
    
class ChromeLoader(object):
  
  def __init__(self):
    chrome_options = Options()  
    #chrome_options.add_argument("--headless")  
    chrome_options.binary_location = '/usr/bin/google-chrome-stable'
    chrome_options.remote_debugging_port=1111
    chrome_options.debugger_address = "127.0.0.1:1111"    
    
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get("https://www.paruvendu.fr/inscription/")
    button = next((el for el in driver.find_elements_by_tag_name('button') if 'accepte' in el.text), None)
    if button:
      button.click()
    login_button = driver.find_element_by_id('fcbx_email2')
    login_button.click()
    driver.find_element_by_id('identification_eMail').send_keys("sebastien.auvray@my-alfred.io")
    driver.find_element_by_id('btnSubmitIdentificationCompte').click()
    time.sleep(0.5)
    driver.find_element_by_id('popinAuthPassword').send_keys("600Bimota")
    time.sleep(0.5)
    driver.find_element_by_id('btnSubmitIdentificationCompte').click()
    
    
    self.driver = driver
    
  def load_url(self, url, headers=None):
    time.sleep(DELAY)
    self.driver.get(url)
    return self.driver
    
    
    