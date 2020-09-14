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

if __name__ == '__main__':
    db = sys.argv[1]
    print("Fixing db {}".format(db))
    FixUserCreationDate(db).fix()
    FixUserAddress(db).fix()
    FixShopsCreationDate(db).fix()
    FixServiceUserAddress(db).fix()
    FixOrphanShops(db).fix()
    FixServiceUserBilling(db).fix()
    FixPhoneNumbers(db).fix()
    #FixBookingAmount(db).fix()
    #FixMangoPayAccountTag(db).fix()
    #FixMangoPayWallet(db).fix()
    FixServiceUserLevel(db).fix()
    FixServiceUserDiplomaCertification(db).fix()
    #FixSiret(db).fix()
    #FixAddAvailabilities(db).fix()
    FixServiceTax(db).fix()
    FixMultipleServices(db).fix()
    FixUserName(db).fix()
