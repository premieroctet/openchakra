'''
Created on 15 juin 2020

@author: seb
'''
import sys
from alfred.lbc.format import Format
from alfred.lbc.db_import import DBImport
import os
import shutil
from datetime import datetime

class LBCImport(object):

  SOURCE_DIR=os.path.expanduser("~/prospection/new")
  DEST_DIR=os.path.expanduser("~/prospection/backup")
  
  def __init__(self, dbname):
    self.dbname=dbname
    found=os.listdir(self.SOURCE_DIR)
    for fname in found:
      try:
        src_file=os.path.join(self.SOURCE_DIR, fname)
        self.imp(src_file)

        dst_file=os.path.join(self.DEST_DIR, "{}_{}".format(fname, int(datetime.timestamp(datetime.now()))))
        shutil.move(src_file, dst_file)
      except Exception as e:
        print("Error on {}".format(fname))
        print(e)
    
  def imp(self, fname):
    f=Format(fname)
    formatted=f.fix()
    imp=DBImport(self.dbname, formatted)
    imp.imp()
      
if __name__ == '__main__':
    LBCImport(sys.argv[1])
