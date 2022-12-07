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
      #self.loader=BasicLoader()
      self.loader=ChromeLoader('sebastien.auvray@my-alfred.io', '600Bimota')
      self.gen=generator(self.loader)
      self.parser=parser
        
    def extract(self):
      index = 0
      for url in self.gen:
        print("Page:{}".format(index))
        driver=self.loader.load_url(url)
        data=self.parser(self.loader, url).get_page_data(driver)
        print(data)
        index += 1