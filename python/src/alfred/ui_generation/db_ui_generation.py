'''
Created on 31 août 2021

@author: seb
'''
import openpyxl as xl


import argparse
import os
import sys

class DBUiGeneration(object):
    
    REQUEST="db.uiconfigurations.update("\
        "{{page: '{}', component: '{}', label: '{}'}},"\
        "{{$set : {{classname: '{}', type:'{}'}}}},"\
        "{{upsert: true}}"\
        ")"
    def __init__(self, xl_path):
      self.wb=xl.load_workbook(xl_path)
      
    def get_column(self, sheet, col_name, mandatory=True):
      first_row=[c.value for c in next(sheet.iter_rows())]
      try:
        return first_row.index(col_name)
      except Exception as e:
        if (mandatory):
          raise e
        return None
    
    def get_mongo(self, page, component, label, classname, type_):
      return  self.REQUEST.format(page, component, label.replace("'", "\\'"), classname, type_)
          
    def export(self):

      for name in self.wb.sheetnames:
        try:
          print('// Handling page {}'.format(name), file=sys.stderr)
          sheet=self.wb[name]
          name=name.replace('Page ', '')
          classnameIdx=self.get_column(sheet, 'classname')
          compTypeIdx=self.get_column(sheet, 'type', False)

          comp=''
          label=''
          for idx, row in enumerate(list(sheet.iter_rows())[1:]):
            try:
              row=list(row)
              col0=row[0].value
              if col0:
                if col0.lower().startswith('composant '):
                  comp=col0[len('composant '):]
                  label=''
                elif col0.lower()!='actions':
                  label=col0
                  
              classname=row[classnameIdx].value
              compType=row[compTypeIdx].value if compTypeIdx!=None else ''
              if classname and classname.lower().replace(' ', '')=='pasducss':
                classname=''
              if compType and not classname:
                raise Exception('Type sans classname')

              if classname:
                if compType:
                  componentType=compType
                  print('Trouvé composant {} {}'.format(classname, componentType, file=sys.stderr))
                else:
                  classname, componentType=classname.split('.')
              if classname:
                if not comp:
                  raise Exception('Classname sans composant')
                req=self.get_mongo(name.capitalize(), comp.capitalize(), label, classname, componentType)
                print(req)
            except BaseException as ex:
              print('****** Page {}, ligne {}:{}'.format(name, idx+2, ex), file=sys.stderr)
        except BaseException as ex:
          print('Page {}:{}'.format(name, ex), file=sys.stderr)

      
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Generation script SQL d'import de la configuration UI")
    parser.add_argument('xl_input', default=None, help='fichier Excel de définition des atrtributs')
    args = parser.parse_args()
    
    exp=DBUiGeneration(args.xl_input)
    exp.export()
