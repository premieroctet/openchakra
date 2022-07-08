const moment=require('moment')
const {BadRequestError, NotFoundError}=require('../utils/errors')
const Booking = require('../models/Booking')
const User=require('../models/User')
const ServiceUser=require('../models/ServiceUser')
require('../models/Prestation')
const {computeDistanceKm}=require('../../utils/functions')

const validateBooking = ({userId, serviceUserId, prestations, location, date, customerBooking}) => {

  let su=null
  return ServiceUser.findById(serviceUserId)
    .populate('alfred')
    .populate({path: 'prestations', populate: 'prestation'})
    .populate('user')
    .then(result => {
      su=result
      if (!su) { throw new NotFoundError('Service introuvable') }
      // Check prestations belong to ServiceUser
      if (!Object.keys(prestations).every(id => su.prestations.find(p => p._id.toString()==id))) {
        throw new NotFoundError('Prestations inconnues dans le service')
      }
      // Service booking => check every prestation in service booking is in ServiceUser
      const prestaLabels=customerBooking ?
        Booking.findById(customerBooking).then(b => b.prestations.map(p => p.name))
        :
        Promise.resolve(null)
      return prestaLabels
    })
    .then(labels => {
      if (labels && !labels.every(l => su.prestations.find(p => p.prestation.label==l))) {
        throw new NotFoundError('Prestations de la réservation de service inconnues dans le service')
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
          throw new BadRequestError('Ce prestataire est trop loin pour pouvoir être réservé')
        }
      }
      // Check date
      if (moment(date)<su.deadline) {
        throw new BadRequestError("Le délai de prévenance n'est pas respecté")
      }
      // Check location
      const LOCS=
      [['main', 'client', 'à domicile'], ['alfred', 'alfred', 'chez le prestataire'],
        ['visio', 'visio', 'en visio'], ['elearning', 'elearning', 'en e-learning']]
      LOCS.forEach(([loc, attr, msg]) => {
        if (location==loc && !su.location[attr]) {
          throw new BadRequestError(`Cette prestation ne peut être effectuée ${msg}`)
        }
      })
    })
}

module.exports=validateBooking
