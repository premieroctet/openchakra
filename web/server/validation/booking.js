const moment=require('moment')

const User=require('../models/User')
const ServiceUser=require('../models/ServiceUser')
const {NotFoundError}=require('../utils/errors')
const {computeDistanceKm}=require('../../utils/functions')
const validateBooking = ({userId, serviceUserId, prestations, location, date, customerBooking}) => {

  let su=null
  return ServiceUser.findById(serviceUserId)
    .populate('alfred')
    .populate('user')
    .then(result => {
      su=result
      if (!su) { throw new NotFoundError('Service introuvable') }
      // Check prestations belong to ServiceUser
      if (!Object.keys(prestations).every(id => su.prestations.find(p => p._id.toString()==id))) {
        throw new NotFoundError('Prestations inconnues dans le service')
      }
      // Check distance
      if (location=='main') {
        const addr=customerBooking ?
          Booking.findById(customerBooking, 'address').then(booking => booking.address)
          :
          User.findById(userId, 'billing_address').then(user => user.billing_address)
        return Promise.all([su.user.billing_address, addr, su.perimeter])
      }
      return null
    })
    .then(res => {
      if (res!=null) {
        const [custAddress, alfAddress, perimeter]=res
        if (computeDistanceKm(custAddress.gps, alfAddress.gps)>perimeter) {
          throw new Error('Ce prestataire est trop loin pour pouvoir être réservé')
        }
      }
      // Check date
      if (moment(date)<su.deadline) {
        throw new Error("Le délai de prévenance n'est pas respecté")
      }
      // Check location
      const LOCS=
      [['main', 'client', 'à domicile'], ['alfred', 'alfred', 'chez le prestataire'],
        ['visio', 'visio', 'en visio'], ['elearning', 'elearning', 'en e-learning']]
      LOCS.forEach(([loc, attr, msg]) => {
        if (location==loc && !su.location[attr]) {
          throw new Error(`Cette prestation ne peut être effectuée ${msg}`)
        }
      })
    })
}

module.exports=validateBooking
