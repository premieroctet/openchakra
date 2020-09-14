'''
Created on 15 juin 2020

@author: seb
'''
from collections import defaultdict
import sys

class Format(object):
  
  EXPECTED_COLUMNS=10
  
  def __init__(self, fname):
    self.fname=fname
    self.contents=open(fname).readlines()
    self.contents=[l for l in self.contents if l.count(';')>3]

    self.contents=[l for l in self.contents if not l.startswith("    at ")]
    
    self.contents=[l.strip().split(';') for l in self.contents]
    
  def fix(self):
    for l in self.contents:
      print(l)
      if not l[1].isdigit():
        l.insert(1, "")
      while len(l) < self.EXPECTED_COLUMNS:
        l.append("")
      if not l[8]:
        l[8]='cours_particuliers'
    for l in self.contents:
      for i in range(len(l)):
        l[i]=l[i].replace('"', "'")
        
    annonces=defaultdict(list)
    
    for l in self.contents:
      if len(l)>self.EXPECTED_COLUMNS:
        print("Too large:{}".format(l))
        continue
      annonces[l[0]].append(l)
    
    result = []
    
    header="phone id name title city dummy zip_code creation category keywords".split()
    
    for _, items in annonces.items():
      an=sorted(items, key=len, )[::-1][0]
      lines=dict([t for t in zip(header, an)])
      result.append(lines)
      
    return result
  
if __name__ == '__main__':
    Format(sys.argv[1]).fix()
