const Billing = require('../../server/models/Billing')
const ServiceUser = require('../../server/models/ServiceUser')
const Prestation = require('../../server/models/Prestation')
const Service = require('../../server/models/Service')
const User = require('../../server/models/User')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const {getDatabaseUri} = require('../../config/config')


console.log(getDatabaseUri())
let user=null
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return User.findOne({email: /aftral/i})
  })
  .then(result => {
    user=result
    console.log(result.email)
    return Billing.findOne({label: /forfait/i})
      .then(b => {
        return Prestation.updateMany({}, {billing: [b._id]})
      })
      .then(() => {
        return Service.find({}).populate('prestations')
      })
  })
  .then(result => {
    const services=result.filter(s => s.prestations?.length>0)
    const promises=services.map(service => {
      const prestation=service.prestations[0]
      return ServiceUser.findOneAndUpdate({service: service._id}, {
        user: user,
        particular_access: true,
        professional_access: true,
        service_address: user.billing_address,
        location: {client: false, alfred: false, visio: true},
        prestations: [{prestation: prestation._id, price: prestation.company_price, billing: prestation.billing[0]}],
        perimeter: 1000,
      },
      {upsert: true, runValidators: true})
    })
    console.log(`Creating ${promises.length} service users`)
    return Promise.all(promises)
  })
  .then(result => {
    console.log(`Created ${result.length}`)
  })
  .catch(err => {
    console.error(err)
  })
