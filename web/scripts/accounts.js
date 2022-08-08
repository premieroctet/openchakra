const mongoose = require('mongoose')
const User = require('../server/models/User')
const {
  CUSTOMER_ADMIN,
  FEURST_ADMIN,
  FEURST_ADV,
  FEURST_SALES,
} = require('../utils/consts')
const Company = require('../server/models/Company')
const {getDatabaseUri} = require('../config/config')
const {MONGOOSE_OPTIONS} = require('../server/utils/database')


const ACCOUNTS={
  wa: 'ACB +',
  sv: 'MAGSI ACCESSOIRES',
  sa: 'BLANCHARD TP',
  rp: '2 T SERVICES',
  md: 'A2F RHONES ALPES',
  ed: 'TOPAZ',
}

const PASSWORD='$2a$10$OlaUPHw1dNXx3wEfamFXb.iCqxGKjmsjxJaaJ1B5DIlt/6rdlBCFC'

const mails_roles= name => {
  return [
    [`${name.toLowerCase()}_admin@feurst.com`, FEURST_ADMIN],
    [`${name.toLowerCase()}_sales@feurst.com`, FEURST_SALES],
    [`${name.toLowerCase()}_adv@feurst.com`, FEURST_ADV],
    [`${name.toLowerCase()}_admin@${name.toLowerCase()}.com`, CUSTOMER_ADMIN],
    [`${name.toLowerCase()}_buyer@${name.toLowerCase()}.com`, FEURST_SALES],
    [`${name.toLowerCase()}_tci@${name.toLowerCase()}.com`, FEURST_SALES],
  ]
}

const compAtts={
  addresses: [{label: 'Principale', address: '5, rue Jacques Monod', zip_code: '76130', city: 'Mont-Saint-Aignan', country: 'France'}],
  delivery_zip_codes: [76, 27, 14],
  catalog_prices: 'PVCDIS',
  net_prices: 'DISTFR',
}


createAccount = (name, compName) => {
  console.log(compName)
  let selfCompany, otherCompany
  return Company.updateOne({name: `${name}.com`}, compAtts, {upsert: true, new: true})
    .then(() => {
      return Company.find({name: `${name}.com`})
    })
    .then(result => {
      selfCompany=result
      return Company.find({name: compName})
    })
    .then(result => {
      otherCompany = result
      return Promise.all(mails_roles(name).map(([email, role]) => {
        return User.updateOne({email: email},
          {firstname: name, name: name, password: PASSWORD, roles: [role], companies: role==FEURST_SALES ? [selfCompany._id, otherCompany._id]:[]}, {upsert: true})
      }))
    })
}

console.log(getDatabaseUri())
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return Promise.all(Object.keys(ACCOUNTS).map(name => createAccount(name, ACCOUNTS[name])))
  })
  .then(() => {
    console.log('ok')
  })
  .catch(err => {
    console.error(err)
  })
