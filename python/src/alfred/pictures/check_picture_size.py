'''
Created on 3 mars 2020

@author: seb
'''
import os
from PIL.Image import open, ANTIALIAS
import sys

MAX_SIZE = 300
IMAGES_EXTENSIONS='.png .jpg .jpeg'.split()

def get_image_files(root_path):
  result = []
  for dirpath, _, filenames in os.walk(root_path):
    fnames = [f for f in filenames if len(list(filter(lambda e : f.lower().endswith(e), IMAGES_EXTENSIONS)))]
    result+=[os.path.join(dirpath, f) for f in fnames]
  return result

def get_image_size(fname):
  img = open(fname)
  return img, img.size

def handle(dirpath):
  files = get_image_files(dirpath)
  for f in files:
    try:
      _, sz = get_image_size(f)
      if max(sz)<MAX_SIZE:
        print("{} => {}".format(f, max(sz)))
    except Exception as e:
      sys.stderr.write("Impossible d'ouvrir {}:{}\n".format(f, e))
  
if __name__ == '__main__':
  handle(sys.argv[1])
