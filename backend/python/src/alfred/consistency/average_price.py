'''
Created on 13 nov. 2019

@author: seb
'''
import os
import csv
from alfred.fix.fix_base import FixBase
from _collections import defaultdict
from alfred.misc.utils import get_item

class AveragePrice(FixBase):
  
  def display(self):
    serviceusers = self.db.get_items("serviceusers")
    prestations = self.db.get_items("prestations")
    billings = self.db.get_items("billings")
    users = self.db.get_items("users")
          
    
    prices=defaultdict(list)
    
    for s in serviceusers:
      user = s.get('user')
      luser =get_item(users, user) 
      for p in s['prestations']:
        presta, price, billing = p.get('prestation', None), p.get('price'), p.get('billing')
        lpresta=get_item(prestations, presta)
        lbill=get_item(billings, billing)
        if presta and price and billing and lpresta and lbill and luser:
          prices[(lpresta.label, lbill.label, luser.email)].append(price)

    for key in prices:
      price=prices[key]
      if price==[1]:
        print("{};{}".format(str(key), price))
    
if __name__ == '__main__':
  AveragePrice("test-myAlfred-V2").display()