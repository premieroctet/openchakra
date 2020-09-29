# coding=UTF-8
'''
Created on 12 juil. 2012

@author: sauvray
'''
import os
from platform import platform
from urllib.request import urlopen, Request
import ssl
from functools import lru_cache


def is_windows():
    return os.name == 'nt'


def is_mac():
    return "darwin" in platform().lower()


def is_fedora():
    return "linux" in platform().lower()


def get_base_dir(subdir):
    if is_windows():
        return 'c:/temp/{0}'.format(subdir)
    elif is_mac() or is_fedora():
        return '/tmp/{}'.format(subdir)
    else:
        raise Exception("Unknown os")


HEADERS = {'User-Agent': '.',
           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0'}

last_url = ""
last_url_data = None

DELAY = 1

@lru_cache()
def load_url(url):
    gcontext = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
    data = urlopen(Request(url, headers=HEADERS), context=gcontext).read()
    return str(data, encoding="utf-8")

