const lodash=require('lodash')
const {roundCurrency}=require('../../../utils/converters')
const {CESU_DISABLED} = require('../../../utils/consts')
const Shop = require('../../models/Shop')
const Commission = require('../../models/Commission')

class PaymentBase {

  constructor() {
  }

  // Return toal prestations & CESU subtotal
  computeTotalPrestations = (serviceUser, prestations) => {
    return new Promise((resolve, reject) => {
      const total = lodash.sum(serviceUser.prestations.map(p => p.price*(prestations[p._id] || 0)))
      Shop.findOne({alfred: serviceUser.user}, {cesu: 1})
        .then(shop => {
          let cesu=0
          if (shop.cesu!=CESU_DISABLED) {
            cesu= lodash.sum(serviceUser.prestations
              .filter(p => p.prestation.cesu_eligible)
              .map(p => p.price*(prestations[p._id] || 0))) || 0
          }
          resolve([total, cesu])
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  }

  // Return pick tax
  computePickTax = (serviceUser, location, totalPrestations) => {
    if (!totalPrestations || location!='alfred') {
      return Promise.resolve(0)
    }
    return Promise.resolve(serviceUser.pick_tax || 0)
  }

  // Return toal prestations & CESU subtotal
  computeTravelTax = ({serviceUser, location, distance}) => {
    if (!distance || ['alfred', 'visio', 'elearning'].includes(location) || !serviceUser.travel_tax) {
      return Promise.resolve(0)
    }
    const tt = serviceUser.travel_tax
    const remainingDist=distance-tt.from
    if (remainingDist<=0) {
      return Promise.resolve(0)
    }
    const tax=remainingDist*tt.rate
    return Promise.resolve(tax)
  }

  computeProviderFees = (serviceUser, prestations, totalPrestations, travelTax, pickTax) => {
    const grandTotal=totalPrestations+travelTax+pickTax
    if (!grandTotal) {
      return Promise.resolve([])
    }
    return new Promise((resolve, reject) => {
      Commission.find({source: 'PROVIDER'})
        .then(commissions => {
          const fees=commissions.map(c => ({amount: c.fixed+c.rate*grandTotal, target: c.target}))
          resolve(fees)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  computeCustomerFees = (serviceUser, prestations, totalPrestations, travelTax, pickTax) => {
    const grandTotal=totalPrestations+travelTax+pickTax
    if (!grandTotal) {
      return Promise.resolve([])
    }
    return new Promise((resolve, reject) => {
      Commission.find({source: 'CUSTOMER'})
        .then(commissions => {
          const fees=commissions.map(c => ({amount: c.fixed+c.rate*grandTotal, target: c.target}))
          resolve(fees)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  compute = ({user, serviceUser, prestations, location, cpf, distance}) => {

    // const avocotes_amount = data.avocotes_amount || 0

    return new Promise((resolve, reject) => {
      const res={
        total_prestations: 0,
        travel_tax: 0,
        pick_tax: 0,
        // Fees array
        customer_fees: [],
        // Fees total
        customer_fee: 0,
        // Fees array
        provider_fees: [],
        // Fees total
        provider_fee: 0,
        total_cesu: 0,
        total: 0,
      }
      return this.computeTotalPrestations(serviceUser, prestations)
        .then(amounts => {
          res.total_prestations = amounts[0]
          res.total_cesu = roundCurrency(amounts[1])
          return this.computePickTax(serviceUser, location, res.total_prestations)
        })
        .then(pick_tax => {
          res.pick_tax = roundCurrency(pick_tax)
          return this.computeTravelTax({serviceUser, location, distance})
        })
        .then(travel_tax => {
          res.travel_tax=roundCurrency(travel_tax)
          return this.computeProviderFees(user, serviceUser, prestations, res.total_prestations, res.travel_tax, res.pick_tax)
        })
        .then(provider_fees => {
          res.provider_fees=provider_fees
          return this.computeCustomerFees(serviceUser, prestations, res.total_prestations, res.travel_tax, res.pick_tax)
        })
        .then(customer_fees => {
          res.customer_fees=customer_fees
          const grandTotal=res.total_prestations+res.travel_tax+res.pick_tax+res.customer_fee
          res.cpf_amount=roundCurrency(cpf ? grandTotal: 0)
          res.total=roundCurrency(grandTotal-res.cpf_amount)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

}

module.exports = PaymentBase
