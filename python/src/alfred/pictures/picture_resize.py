'''
Created on 3 mars 2020

@author: seb
'''
import os
from PIL.Image import open, ANTIALIAS
import sys

MAX_SIZE = 800
IMAGES_EXTENSIONS='.png .jpg .jpeg'.split()

def get_image_files(root_path):
  result = []
  for dirpath, _, filenames in os.walk(root_path):
    fnames = [f for f in filenames if len(list(filter(lambda e : f.lower().endswith(e), IMAGES_EXTENSIONS)))]
    result+=[os.path.join(dirpath, f) for f in fnames]
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
  files = get_image_files(dirpath)
  for f in files:
    try:
      img, sz = get_image_size(f)
      resized = get_resized_size(sz, MAX_SIZE)
      if not resized:
        #print("No resizing {} {}".format(sz, f))
        pass
      else:
        print("Resizing from {} to {} for {}".format(sz, resized, f))
        img.thumbnail(resized, ANTIALIAS)
        img.save(f)
    except Exception as e:
      sys.stderr.write("Impossible de convertir {}:{}\n".format(f, e))
  
if __name__ == '__main__':
  handle(sys.argv[1])
