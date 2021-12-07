class PaymentBase {

  constructor() {
  }


  getProviderFeeRate = () => {
    return this.customization
      && this.customization
      && this.customization.provider_fee
      && this.customization.provider_fee.rate
      || 0
  }

  getProviderFeeRecipient = () => {
    return this.customization
      && this.customization
      && this.customization.provider_fee
      && this.customization.provider_fee.destinee
      || 0
  }

  getCustomerFeeRate = () => {
    return this.customization
      && this.customization
      && this.customization.customer_fee
      && this.customization.customer_fee.rate
      || 0
  }

  getCustomerFeeRecipient = () => {
    return this.customization
      && this.customization
      && this.customization.customer_fee
      && this.customization.customer_fee.destinee
      || 0
  }

}

module.exports = PaymentBase
