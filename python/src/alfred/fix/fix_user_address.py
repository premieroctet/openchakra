'''
Created on 5 mars 2020

@author: seb
'''
from alfred.misc.gps import OpenCageGPS
import sys
from alfred.fix.fix_base import FixBase

class FixUserAddress(FixBase):
    
    def isAddrValid(self,addr):
        result = False;
        if addr is not None:
            if addr.get('gps', {}).get('lat') and addr.get('gps', {}).get('lng'):
                result = True
        return result
        
    def fix(self):
        users = self.db.get_items("users")
        invalid_users = [u for u in users if not self.isAddrValid(u.get('billing_address', None))]
        """
        valid_users = [u for u in users if self.isAddrValid(u.get('billing_address', None))]
        print(valid_users[0].billing_address)
        return
        """
        for u in invalid_users:
            print(u.billing_address, u.email)
            q = u.billing_address['address']+","+u.billing_address['city']+","+u.billing_address['country']
            try:
              gps = OpenCageGPS().resolve(q)
              bill_addr = u.billing_address
              bill_addr['gps']=gps
              updated_document = {"_id": u['_id'], 'billing_address':bill_addr}
              print("Should update to {}".format(updated_document))
              #self.db.update_document("users", updated_document)
            except Exception as e:
              print(e)
              print('*************** Error on '+str(q))
            """
            user_id = s['user']
            user = [u for u in users if u['_id']==user_id][0]
            valid_addr = user['billing_address']
            updated_document = {"_id":s['_id'], 'service_address':valid_addr}
            print("Updating {}".format(updated_document))
            self.db.update_document("serviceusers", updated_document)
            """

if __name__ == '__main__':
    FixUserAddress(sys.argv[1]).fix()
