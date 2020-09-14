'''
Created on 5 mars 2020

@author: seb
'''
import sys
from alfred.fix.fix_base import FixBase

class FixServiceUserAddress(FixBase):

    def isAddrValid(self,addr):
        result = False;
        if addr is not None:
            if addr.get('gps', {}).get('lat') and addr.get('gps', {}).get('lng'):
                result = True
        """
        if result:
            print("{} is valid:{}".format(addr, result)
        """
        return result
        
    def fix(self):
        users = self.db.get_items("users")
        services = self.db.get_items("serviceusers")
        invalid_services = [s for s in services if not self.isAddrValid(s.get('service_address', None))]
        for s in invalid_services:
            user_id = s['user']
            user = [u for u in users if u['_id']==user_id][0]
            valid_addr = user['billing_address']
            updated_document = {"_id":s['_id'], 'service_address':valid_addr}
            print("Updating {}".format(updated_document))
            self.db.update_document("serviceusers", updated_document)
        
if __name__ == '__main__':
    FixServiceUserAddress(sys.argv[1]).fix()
