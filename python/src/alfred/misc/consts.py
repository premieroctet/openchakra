'''
Created on 24 juin 2019

@author: seb
'''
from os.path import dirname, abspath, join
from functools import lru_cache
import re

def get_root_dir():
    return dirname(dirname(dirname(dirname(abspath(__file__))))) 

def get_data_dir():
    return join(get_root_dir(), "data")

class AttributeDict(dict):
    __getattr__ = dict.__getitem__
    __setattr__ = dict.__setitem__

    def __repr__(self):
        return "{{{}}}".format(";".join(["{}:{}".format(repr(k), repr(v)) for k, v in self.items()]))


def get_items(collec, _id, key='_id'):
  items = [c for c in collec if str(c[key]).strip() == str(_id).strip()]
  return items

def get_item(collec, _id, key='_id'):
  items = get_items(collec, _id, key)
  if not items or len(items)>1:
    raise Exception('{} items instead of 1 for {}={}'.format(len(items), key, _id))
  return items[0]

PHONE_MAIL_PATTERNS = ['\S+@\S+', '06', '07']
PATTERNS = [re.compile(p) for p in PHONE_MAIL_PATTERNS]

if __name__ == '__main__':
	print(get_root_dir())
	print(get_data_dir())