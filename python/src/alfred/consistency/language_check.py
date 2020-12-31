'''
Created on 28 août 2019

@author: seb
'''
from alfred.misc.utils import get_data_dir
from enchant.checker import SpellChecker
import enchant
from alfred.consistency.text_conversion import words_provider, get_csv_column
import os

class CustomDict(enchant.Dict):
  
  def __init__(self):
    super(CustomDict, self).__init__("fr_Fr")
    
  def check(self, word):
    if set("0123456789").intersection(word):
      return True
    return super(CustomDict, self).check(word)
    
class WordChecker(object):
  
  def __init__(self):
    super(WordChecker, self).__init__()
    self.checker = SpellChecker(CustomDict())
    for known in '< > & + - / Airbnb Apple Antivirus Anti-âge After Agility Alu Akai'.split():
      self.checker.add(known)
    for known in """nouettes rotofil shopper nail poële iPad locks faïence/crédence doble 
                    checkout pilates désherbeur gyroroue protege-griffes iphone placoplâtre 
                    krabong lauzière budo chun boran flying réhaussement stripteaser
                    ifl  Penderiologie détaupage chablon vidéoprojecteur bœuf bar-mitzvah
		""".split():
      self.checker.add(known)
      
  def is_word_ok(self, word):
    return self.checker.check(word)

  def get_suggestions(self, word):
    return self.checker.suggest(word)
  
class LineChecker():
  
  def check_line(self, line):
    if line[0]!=line[0].upper():
      return False
    if line[1:]!=line[1:].lower():
      return False
    return True
    
if __name__ == '__main__':
  prestas_file = os.path.join(get_data_dir(), "prestations.csv") 
  lines_provider = get_csv_column(prestas_file, 1)
  lc = LineChecker()
  mispelled = [l for l in sorted(lines_provider) if not lc.check_line(l)]
  print("\n".join(mispelled))
  """
  words = words_provider(lines_provider)
  wc = WordChecker()
  mispelled = sorted([word for word in words if not wc.is_word_ok(word)])
  correct = [wc.get_suggestions(word) for word in mispelled]
  for m, c in zip(mispelled, correct):
    print("{} => {}".format(m, c))
  """
  
