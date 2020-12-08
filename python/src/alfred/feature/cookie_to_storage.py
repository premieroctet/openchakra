'''
Created on 7 déc. 2020

@author: seb
'''
from os.path import abspath, join
import os
import re


class CookieToStorage(object):
  
  EXCLUDE_DIRS="node_modules .next".split()
  
  def __init__(self):
    self.curdir = abspath('.')
    if not self.curdir.endswith('/web'):
      raise Exception('Lancer dans .../web')

  def __get_level(self, path):
    return path.count('/')-self.curdir.count('/')-1
    
  def __replace(self, path, toFind, toReplace, postFn=None):
    contents=open(path).readlines()
    found=False
    for idx, line in enumerate(contents):
      if toFind.search(line):
        print(line)
        contents[idx]=toFind.sub(toReplace, line)
        found=True
        
    if found:
      print("Found in {}".format(path))
      if postFn:
        contents=postFn(path, contents)
      print(path, self.__get_level(path))
      open(path, 'w').writelines(contents)
    
  """ replace axios cookie authentication with corresponding setAxiosAuthentication """
  def phase1(self):
    
    def updateImport(path, contents):
      if not "{setAxiosAuthentication}=require('../../utils/authentication')" in " ".join(contents): 
        contents.insert(0, "const {{setAxiosAuthentication}}=require('{}utils/authentication')\n".format("../"*self.__get_level(path)))
      return contents

    reg = re.compile("axios.defaults.headers.common\['Authorization'\] \=.*$")
    replaceBy = 'setAxiosAuthentication()'
    for root, dirs, files in os.walk(self.curdir):
      if 'node_modules' in dirs:
        dirs.remove('node_modules')
      files=[f for f in files if f.endswith('.js')]
      if 'authentication.js' in files:
        files.remove('authentication.js')
      for f in files:
        self.__replace(join(root, f), reg, replaceBy, updateImport)
    
  """ replace authentication cookie removal with corresponding clearAuthenticationToken """
  def phase2(self):
    def updateImport(path, contents):
      if not "{clearAuthenticationToken}=require('" in " ".join(contents): 
        contents.insert(0, "const {{clearAuthenticationToken}}=require('{}utils/authentication')\n".format("../"*self.__get_level(path)))
      return contents

    reg = re.compile("cookie.remove\('token'.*$")
    replaceBy = 'clearAuthenticationToken()'
    for root, dirs, files in os.walk(self.curdir):
      if 'node_modules' in dirs:
        dirs.remove('node_modules')
      files=[f for f in files if f.endswith('.js')]
      if 'authentication.js' in files:
        files.remove('authentication.js')
      for f in files:
        self.__replace(join(root, f), reg, replaceBy, updateImport)

  """ remove react-cookies import """
  def phase3(self):

    reg = re.compile("^import.*react-cookies.*$")
    replaceBy = ''
    for root, dirs, files in os.walk(self.curdir):
      for exclude in self.EXCLUDE_DIRS:
        if exclude in dirs:
          dirs.remove(exclude)
      files=[f for f in files if f.endswith('.js')]
      if 'authentication.js' in files:
        files.remove('authentication.js')
      if 'functions.js' in files:
        files.remove('functions.js')
      for f in files:
        self.__replace(join(root, f), reg, replaceBy)
    
    
  def fix(self):
    self.phase1()
    self.phase2()
    #self.phase3()
    
if __name__ == '__main__':
  CookieToStorage().fix()