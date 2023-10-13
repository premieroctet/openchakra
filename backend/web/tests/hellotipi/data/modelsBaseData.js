const {
  COACHING,
  ROLE_COMPANY_BUYER,
  ROLE_TI
} = require('../../../server/plugins/all-inclusive/consts')
const moment = require('moment')

const BASE={
  city: 'Rouen', zip_code:76, address:'address', birthday: moment().subtract(30, 'years'),
  password: 'passwd', phone: '0606060606', cguAccepted: true,
}

const TI_USER={...BASE,
  role: ROLE_TI, coaching: Object.keys(COACHING)[0],
  email: 'hello+ti@wappizy.com', lastname: 'TI', firstname: 'TI',
}

const CUSTOMER_USER={...BASE,
  role: ROLE_COMPANY_BUYER, city: 'Rouen', company_name:'company',
  email: 'hello+customer@wappizy.com', lastname: 'CUSTOMER', firstname: 'CUSTOMER',
}

const QUOTATION={
  ...CUSTOMER_USER, name: 'Devis',
}

const QUOTATION_DETAIL={
  vat: 0.15, ht_price:10, quantity: 1, label: 'Ligne détail',
}

module.exports={
  TI_USER, CUSTOMER_USER, QUOTATION, QUOTATION_DETAIL,
}
