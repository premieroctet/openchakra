# coding=UTF-8
'''
Created on 11 juil. 2012

@author: sauvray
'''
class BaseParser(object):

    def __init__(self, loader, url):
        object.__init__(self)
        self.loader = loader
        self.url = url

    def extract_data(self):
        contents = self.loader.load_url(self.url)
        data = self.get_page_data(contents)
        return data
