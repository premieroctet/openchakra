const mongoose = require('mongoose')
const {config} = require('../config/config')
const {connectionPool}=require('../server/utils/database')
const {serverContextFromPartner}=require('../server/utils/serverContext')
const _ =require('lodash')

const all_addresses = user => {
  let result=[]
  result.push(user.billing_address.gps)
  user.service_address.forEach(sa => {
    result.push({lat: sa.lat, lng: sa.lng})
  })
  return result
}
const update_booking_locations = () => {
  connectionPool.databases.map(d => serverContextFromPartner(d)).forEach(context => {
    const Booking=context.getModel('Booking')
    Booking.find({location: {$exists: false}, customer_booking: null, company_customer: null})
      .populate('user')
      .populate('alfred')
      .then(result => {
        const bad=result.filter(b => b.address && !(_.find(all_addresses(b.user), b.address.gps)||_.find(all_addresses(b.alfred), b.address.gps)))
        console.log(`Mauvais:${bad.length}/${result.length}`)
        console.log(`User:${_.uniq(bad.map(b => b.user.full_name))}`)
      })
      .catch(err => {
        console.error(err)
      })
  })
}

// Connect to MongoDB
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => {
    console.log('Connected DB')
    setTimeout(update_booking_locations, 2000)
  })
  .catch(err => console.error(err))
