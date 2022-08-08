const mongoose = require('mongoose')
const Company = require('../../server/models/Company')
const User = require('../../server/models/User')
const {capitalize} = require('../../utils/text')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const {getDatabaseUri} = require('../../config/config')
const {
  CUSTOMER_ADMIN,
  CUSTOMER_BUYER,
  FEURST_ADMIN,
  FEURST_ADV,
  FEURST_SALES,
} = require('../../utils/consts')

const PASSWORD='$2a$10$I.JGpEq3ZI8d.wqjJjnSY.cRgyI.FRasGtryVnO5GpO7yh9pqfpSi'

const COMPANY={
  name: 'Compagnie test',
  addresses: [{label: 'Principale', address: '1 rue Michelet', city: 'Saint-Etienne', zip_code: 42000, country: 'France'}],
  delivery_zip_codes: [42, 69, 38],
  carriage_paid: 2000,
  catalog_prices: 'DISTFR',
  net_prices: 'CHAUFR',
  sales_representative: 'lena.sonnaly@safe-feurst.fr',
}
const ACCOUNTS=[
  {email: 'patricia.raimondi@safe-feurst.fr', roles: [FEURST_ADV]},
  {email: 'lena.sonnaly@safe-feurst.fr', roles: [FEURST_SALES]},
  {email: 'florian.benetiere@safe-feurst.fr', roles: [FEURST_ADMIN]},
  {email: 'philippe.jouannot@safe-feurst.fr', roles: [CUSTOMER_BUYER]},
  {email: 'olivier.boutet@safe-metal.com', roles: [CUSTOMER_ADMIN]},
]


createAccount = ({email, roles}) => {
  const [firstname, lastname]=email.split('@')[0].split('.').map(capitalize)
  return User.findOneAndUpdate(
    {email: email},
    {firstname: firstname, name: lastname, email: email, roles: roles, password: PASSWORD},
    {new: true, upsert: true, runValidators: true})
}

createCompany = company => {
  return User.findOne({email: company.sales_representative})
    .then(u => {
      return Company.findOneAndUpdate(
        {name: company.name},
        {...company, sales_representative: u._id},
        {upsert: true, new: true, runValidators: true})
    })
}

console.log(getDatabaseUri())
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return Promise.all(ACCOUNTS.map(account => createAccount(account)))
  })
  .then(res => {
    console.log(res)
    return createCompany(COMPANY)
  })
  .then(company => {
    console.log(company)
    return Promise.all(ACCOUNTS.filter(a => a.roles[0].includes('CUSTOMER_')).map(a => User.findOneAndUpdate({email: a.email}, {company: company._id})))
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })
