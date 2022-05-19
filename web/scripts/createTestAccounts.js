const mongoose = require('mongoose')
const {
  CUSTOMER_ADMIN,
  CUSTOMER_BUYER,
  CUSTOMER_TCI,
  FEURST_ADMIN,
  FEURST_ADV,
  FEURST_SALES,
  ROLES,
} = require('../utils/feurst/consts')
const User = require('../server/models/User')
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
    [`${name.toLowerCase()}_admin@feurst.fr`, FEURST_ADMIN],
    [`${name.toLowerCase()}_sales@feurst.fr`, FEURST_SALES],
    [`${name.toLowerCase()}_adv@feurst.fr`, FEURST_ADV],
    [`${name.toLowerCase()}_admin@${name.toLowerCase()}.com`, CUSTOMER_ADMIN],
    [`${name.toLowerCase()}_buyer@${name.toLowerCase()}.com`, CUSTOMER_BUYER],
    [`${name.toLowerCase()}_tci@${name.toLowerCase()}.com`, CUSTOMER_TCI],
  ]
}

const compAtts={
  addresses: [{label: 'Principale', address: '5, rue Jacques Monod', zip_code: '76130', city: 'Mont-Saint-Aignan', country: 'France'}],
  delivery_zip_codes: [76, 27, 14],
  catalog_prices: 'PVCDIS',
  net_prices: 'DISTFR',
  carriage_paid: 2000,
}


createAccount = (name, compName) => {
  console.log(`Création compagnie ${name}.com`)
  return Company.updateOne({name: `${name}.com`}, compAtts, {upsert: true, new: true})
    .then(() => {
      return Promise.all([`${name}.com`, compName].map(n => Company.findOne({name: n})))
    })
    .then(([selfCompany, otherCompany]) => {
      return Promise.all(mails_roles(name).map(([email, role]) => {
        const company=[CUSTOMER_ADMIN, CUSTOMER_BUYER, CUSTOMER_TCI].includes(role) ? selfCompany : null
        const companies=FEURST_SALES==role ? [selfCompany, otherCompany] : null
        let log=`Création compte ${email}, rôle ${ROLES[role]}, mdp Alfred123;`
        if (companies) {
          log+= ` rattaché aux compagnies ${selfCompany.name}.com et ${otherCompany.name}`
        }
        if (company) {
          log+= ` appartenant à la compagnie ${selfCompany.name}`
        }
        console.log(log)
        return User.updateOne({email: email},
          {firstname: name, name: name, password: PASSWORD, roles: [role], company: company, companies: companies}, {upsert: true})
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
