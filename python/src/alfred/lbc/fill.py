'''
Created on 15 juin 2020

@author: seb
'''
import sys

class Fill(object):
  
  EXPECTED_COLUMNS=10
  
  def __init__(self, fname):
    self.fname=fname
    self.contents=[l.strip() for l in open(fname).readlines()]
    
  def fix(self):
    # get all lines for each phone
    phones = dict()
    for l in self.contents:
      if ';' in l:
        phone=l.split(';')[0]
        phones[phone]=l
        if l.count(';')>phones[phone].count(';'):
          phones[phone]=l
      
    for l in self.contents:
      if ';' in l:
        phone=l.split(';')[0]
        if phones[phone]==l:
          print(l)
      else:
        print(l)
      
if __name__ == '__main__':
    Fill(sys.argv[1]).fix()
