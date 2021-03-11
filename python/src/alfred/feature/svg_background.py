'''
Created on 11 mars 2021

@author: seb
'''
from bs4 import BeautifulSoup
import sys

class SvgBackgroundGenerator():
  
  def generate(self, filenames):
    for filename in filenames:
      bs = BeautifulSoup(open(filename, 'rb').read(), features="lxml")
      size=bs.find('svg')
      print(size.attrs['viewbox'])

    
if __name__ == '__main__':
    SvgBackgroundGenerator().generate(sys.argv[1:])