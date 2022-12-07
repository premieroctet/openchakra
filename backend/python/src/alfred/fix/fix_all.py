'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_user_creation_date import FixUserCreationDate
from alfred.fix.fix_user_address import FixUserAddress
from alfred.fix.fix_serviceuser_address import FixServiceUserAddress
from alfred.fix.fix_shops_creation_date import FixShopsCreationDate
from alfred.fix.fix_orphan_shops import FixOrphanShops
from alfred.fix.fix_serviceuser_billing import FixServiceUserBilling
from alfred.fix.fix_serviceuser_level import FixServiceUserLevel
from alfred.fix.fix_phone_numbers import FixPhoneNumbers
from alfred.fix.fix_service_tax import FixServiceTax
from alfred.fix.fix_multiple_services import FixMultipleServices
from alfred.fix.fix_user_name import FixUserName
from alfred.fix.fix_serviceuser_diploma_certification import FixServiceUserDiplomaCertification
from alfred.fix.fix_missing_rib import FixMissingRib

if __name__ == '__main__':
    db = sys.argv[1]
    print("Fixing db {}".format(db))
    try:
      FixUserCreationDate(db).fix()
    except Exception as e:
      print(e)
    #FixUserAddress(db).fix()
    try:
      FixShopsCreationDate(db).fix()
    except Exception as e:
      print(e)
    try:
      FixServiceUserAddress(db).fix()
    except Exception as e:
      print(e)
    try:
      FixOrphanShops(db).fix()
    except Exception as e:
      print(e)
    try:
      FixServiceUserBilling(db).fix()
    except Exception as e:
      print(e)
    try:
      FixPhoneNumbers(db).fix()
    except Exception as e:
      print(e)
    #FixBookingAmount(db).fix()
    #FixMangoPayAccountTag(db).fix()
    #FixMangoPayWallet(db).fix()
    try:
      FixServiceUserLevel(db).fix()
    except Exception as e:
      print(e)
    try:
      FixServiceUserDiplomaCertification(db).fix()
    except Exception as e:
      print(e)
    #FixSiret(db).fix()
    #FixAddAvailabilities(db).fix()
    try:
      FixServiceTax(db).fix()
    except Exception as e:
      print(e)
    try:
      FixMultipleServices(db).fix()
    except Exception as e:
      print(e)
    try:
      FixUserName(db).fix()
    except Exception as e:
      print(e)
