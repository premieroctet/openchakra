const moment=require('moment')
const lodash=require('lodash')
const {BadRequestError, NotFoundError}=require('../utils/errors')
const Booking = require('../models/Booking')
const User=require('../models/User')
const ServiceUser=require('../models/ServiceUser')
require('../models/Prestation')
const {computeDistanceKm}=require('../../utils/functions')
const {ALL_LOCATIONS, LOCATION_CLIENT, LOCATION_ALFRED, LOCATION_VISIO, LOCATION_ELEARNING}=require('../../utils/consts')

const validateBooking = ({userId, serviceUserId, prestations, location, date, customerBookingId, informationRequest}) => {

  let su=null

  // test location
  if (!ALL_LOCATIONS.includes(location)) {
    return Promise.reject(new BadRequestError(`Expected location in ${ALL_LOCATIONS}, got ${JSON.stringify(location)}`))
  }
  if (!lodash.isBoolean(informationRequest)) {
    return Promise.reject(new BadRequestError(`Expected boolean informationRequest, got ${JSON.stringify(informationRequest)}`))
  }
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
      const prestaLabels=customerBookingId ?
        Booking.findById(customerBookingId).then(b => {
          if (!b) { throw new NotFoundError(`Service booking ${customerBookingId} introuvable`) }
          b.prestations.map(p => p.name)
        })
        :
        Promise.resolve(null)
      return prestaLabels
    })
    .then(labels => {
      if (labels && !labels.every(l => su.prestations.find(p => p.prestation.label==l))) {
        throw new NotFoundError('Prestations de la réservation de service inconnues dans le service')
      }
      // Check distance
      if (location==LOCATION_CLIENT) {
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
      [
        [LOCATION_CLIENT, 'client', 'à domicile'],
        [LOCATION_ALFRED, 'alfred', 'chez le prestataire'],
        [LOCATION_VISIO, 'visio', 'en visio'],
        [LOCATION_ELEARNING, 'elearning', 'en e-learning']]
      LOCS.forEach(([loc, attr, msg]) => {
        if (location==loc && !su.location[attr]) {
          throw new BadRequestError(`Cette prestation ne peut être effectuée ${msg}`)
        }
      })
    })
}

module.exports=validateBooking
