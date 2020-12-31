'''
Created on 3 mars 2020

@author: seb
'''
import os
from PIL.Image import open, ANTIALIAS
import sys
from os.path import abspath, join, isfile

MAX_SIZE = 500
IMAGES_EXTENSIONS='.png .jpg .jpeg'.split()

def get_image_files(root_path):
  result = os.listdir(root_path)
  result = [f for f in result if filter(lambda e : f.lower().endswith(e), IMAGES_EXTENSIONS)]
  result = [join(root_path,f) for f in result]
  result = [f for f in result if isfile(f)]
  return result

def get_resized_size(size, max_dimension):
  if all(s<=max_dimension for s in size):
    return None
  max_size=max(size)
  ratio = max_dimension/max_size
  return [int(s*ratio) for s in size]
             
def get_image_size(fname):
  img = open(fname)
  return img, img.size

def handle(dirpath):
  dirpath=abspath(dirpath)
  if not dirpath.endswith('/static/profile'):
    raise Exception('Répertoire {} incorrect, profile attendu'.format(dirpath))
  print("Searching in {}".format(dirpath))
  files = get_image_files(dirpath)
  print("Checking {} files size".format(len(files)))
  for f in files:
    try:
      img, sz = get_image_size(f)
      resized = get_resized_size(sz, MAX_SIZE)
      if not resized:
        #print("No resizing {} {}".format(sz, f))
        pass
      else:
        img.thumbnail(resized, ANTIALIAS)
        img.save(f)
        print("Resized from {} to {} for {}".format(sz, resized, f))
    except Exception as e:
      sys.stderr.write("Can not convert {}:{}\n".format(f, e))
  
if __name__ == '__main__':
  handle(sys.argv[1])
