'''
Created on 13 nov. 2019

@author: seb
'''
import os
from alfred.misc.utils import get_data_dir
import csv

def get_csv_column(fname, column, delimiter=","):
  lines = []
  with open(fname, encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile, delimiter=delimiter)
    for row in reader:
      if row[column]:
        lines.append(row[column])
  return lines
  
def words_provider(line_provider):
  full_text = " ".join(line_provider)
  words = set(full_text.split())
  return words

if __name__ == '__main__':
    prestas = os.path.join(get_data_dir(), "prestations.csv")
    words = words_provider(get_csv_column(prestas, 1))
    print("\n".join(words))