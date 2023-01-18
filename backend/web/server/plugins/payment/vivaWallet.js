const axios=require('axios')
const util=require('util')
const {getVivaWalletConfig}=require('../../../config/config')

const vvConfig=getVivaWalletConfig()

const LIVE_DOMAIN='https://www.vivapayments.com'

const AUTH_TOKEN_DOMAIN=vvConfig.production ? LIVE_DOMAIN: 'https://demo-accounts.vivapayments.com'
const PAYMENT_DOMAIN=vvConfig.production ? LIVE_DOMAIN: 'https://demo-api.vivapayments.com'
const WEBHOOK_DOMAIN=vvConfig.production ? LIVE_DOMAIN: 'https://demo.vivapayments.com'
const PAYMENT_PAGE_DOMAIN=vvConfig.production ? LIVE_DOMAIN: 'https://demo.vivapayments.com'
// https://developer.vivawallet.com/smart-checkout/smart-checkout-integration/#step-2-redirect-the-customer-to-smart-checkout-to-pay-the-payment-order

const getAuthToken = () => {
  const url=new URL('/connect/token', AUTH_TOKEN_DOMAIN).toString()
  const auth=`${vvConfig.clientId}:${vvConfig.clientSecret}`
  const base64Auth=Buffer.from(auth).toString('base64')
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')

  return axios.post(url,
    params,
    {
      headers: {
        Authorization: `Basic ${base64Auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
    .then(res => res.data.access_token)
}

const getWebHookToken = () => {
  const url=new URL('/api/messages/config/token', WEBHOOK_DOMAIN).toString()
  const auth=`${vvConfig.apiId}:${vvConfig.apiKey}`
  const base64Auth=Buffer.from(auth).toString('base64')

  return axios.get(url,
    {
      headers: {Authorization: `Basic ${base64Auth}`},
    })
    .then(({data: {Key}}) => Key)
}

const initiatePayment = ({amount, email, color}) => {
  const url=new URL('/checkout/v2/orders', PAYMENT_DOMAIN).toString()

  return getAuthToken()
    .then(token => {
      return axios.post(url,
        {amount: amount*100, customer: {email}},
        {headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}},
      )
    })
    .then(res => {
      const code=res.data.orderCode
      const payment_url=new URL('/web/checkout', PAYMENT_PAGE_DOMAIN)
      /** As of https://developer.vivawallet.com/smart-checkout/smart-checkout-integration/#step-2-redirect-the-customer-to-smart-checkout-to-pay-the-payment-order
       Should pass code as string */
      payment_url.searchParams.append('ref', code.toString())
      if (color) {
        payment_url.searchParams.append('color', color.replace(/^#/, ''))
      }
      return {orderCode:code, redirect:payment_url.toString()}
    })
}

module.exports={
  getAuthToken,
  getWebHookToken,
  initiatePayment,
}
