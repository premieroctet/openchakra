const PaymentBase = require('./paymentBase')

class AllEPayment extends PaymentBase {

  constructor() {
    super()
  }

  getAlfredRecipient = () => {
    return 12
  }

  getCustomerRecipient = () => {
    return 0
  }


}
module.exports = AllEPayment
