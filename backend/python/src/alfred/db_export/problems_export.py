import os
import sys

from alfred.database.db_access import DBAccess
from alfred.misc.utils import get_item, get_items, has_illegal_pattern
from csv import writer, DictWriter
from datetime import datetime
from dateutil.relativedelta import relativedelta
from pprint import pprint


class ProblemsExport(object):

    def __init__(self, db_name):
        super(object, self).__init__()
        self.db = DBAccess(db_name)

    def export(self, directory):
      USERS = self.db.get_items("users")
      SERVICEUSERS= self.db.get_items("serviceusers")
      SERVICES = self.db.get_items("services")
      SHOPS = self.db.get_items("shops")
      
      keys = 'collection _id lien name problem extra'.split()
      out = open(os.path.join(directory, "problems.csv"), "w", encoding='utf-8')
      d=DictWriter(out, keys, delimiter=";")
      d.writeheader()
      
      rows=[]
      
      """ Utilisateur mineurs """
      pb='Utilisateur mineur:{} ans, services:{}'
      lien='https://my-alfred.io/viewProfile?id={}'
      for u in [u for u in USERS if relativedelta(datetime.now(), u.birthday).years<18]:
        age=relativedelta(datetime.now(), u.birthday).years
        servicesusers = get_items(SERVICEUSERS, u._id, "user")
        services=set()
        for su in servicesusers:
          services.add(*[s.label for s in get_items(SERVICES, su.service)])
        record={
          'collection' : 'users', 
          '_id': u._id,
          'name': '{} {}'.format(u.firstname, u.name),
          'problem': pb.format(age, ','.join(services) if services else 'aucun'),
          'lien': lien.format(u._id),
          'extra': "Alfred" if u.is_alfred else "Utilisateur"
        }
        rows.append(record)

      """ Prestas prix à 0 """
      pb='Service sans tarif ou prestation'
      lien='https://my-alfred.io/userServicePreview?id={}'
      no_price=[su for su in SERVICEUSERS if any(not p['price'] or not p.get('prestation', None) for p in su.prestations)]
      for su in sorted(no_price, key=lambda su: su.user):
        shop=[s for s in SHOPS if any(service==su._id for service in s.services)][0]
        alfred=get_item(USERS, shop.alfred)
        record={
          'collection' : 'serviceusers', 
          '_id': su._id,
          'name': '{} {}'.format(alfred.firstname, alfred.name),
          'problem': pb,
          'lien': lien.format(su._id),
        }
        rows.append(record)

      """ Utilisateur descriptioncontenant tel ou mail """
      pb='Utilisateur : Description avec tel ou mail:{}'
      lien='https://my-alfred.io/viewProfile?id={}'
      for u in [u for u in USERS if has_illegal_pattern(u.get('description', ''))]:
        record={
          'collection' : 'users', 
          '_id': u._id,
          'name': '{} {}'.format(u.firstname, u.name),
          'problem': pb.format(u.description),
          'lien': lien.format(u._id),
        }
        rows.append(record)

      """ Services descriptioncontenant tel ou mail """
      pb='Service : Description avec tel ou mail:{}'
      lien='https://my-alfred.io/userServicePreview?id={}'
      for s in [s for s in SERVICEUSERS if has_illegal_pattern(s.get('description', ''))]:
        alfred=get_item(USERS, s.user)
        record={
          'collection' : 'serviceusers', 
          '_id': s._id,
          'name': '{} {}'.format(alfred.firstname, alfred.name),
          'problem': pb.format(s.description),
          'lien': lien.format(s._id),
        }
        rows.append(record)

      d.writerows(rows)

if __name__ == '__main__':
    exp=ProblemsExport(sys.argv[1])
    exp.export(sys.argv[2])
