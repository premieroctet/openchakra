'''
Created on 15 sept. 2020

@author: seb
'''
from alfred.scrapper.utils.loader import BasicLoader, ChromeLoader

class DataExtractor(object):
    '''
    classdocs
    '''


    def __init__(self, generator, parser, output_path):
      super().__init__()
      self.loader=ChromeLoader() # BasicLoader()
      self.gen=generator(self.loader)
        
    def extract(self):
      for url in self.gen:
        print(url)