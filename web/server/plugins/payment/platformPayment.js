const lodash=require('lodash')
const Commission=require('../../models/Commission')
const PaymentBase = require('./paymentBase')

/**
Payment class for platform mode
Prestation price is defined by the company
Fee is computed by company prices total minus (provider prices+travel tax+pick tax)
*/
class PlatformPayment extends PaymentBase {

  constructor() {
    super()
  }

  computeProviderFees = () => {
    return Promise.resolve([])
  }

  computeCustomerFees = (serviceUser, prestations, totalPrestations, travelTax, pickTax) => {
    return new Promise((resolve, reject) => {
      const grandTotal=totalPrestations+travelTax+pickTax
      const companyTotal=lodash.sum(
        serviceUser.prestations
          .map(p => p.prestation.company_price*(prestations[p._id] || 0))) || 0
      const customer_fee=companyTotal-grandTotal
      Commission.findOne({source: 'CUSTOMER'})
        .then(commission => {
          resolve([{amount: customer_fee, target: commission.target}])
        })
        .catch(err => {
          reject(err)
        })
    })
  }

}

module.exports = PlatformPayment
