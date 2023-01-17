const axios = require('axios');
const util=require('util')
const {getAuthToken, initiatePayment, getWebHookToken}=require('../../server/plugins/payment/vivaWallet')

jest.setTimeout(20000)

/**
axios.interceptors.request.use(request => {
  console.log('Starting Request', util.inspect(request, null, 2))
  return request
})
*/

describe('VivaWallet tests', () => {

  test('Should return token', async () => {
    return expect(getAuthToken()).resolves.toMatch(/.+/)
  })

  test('Should get webhook token', async () => {
    return expect(getWebHookToken()).resolves.toMatch(/.+/)
  })

  test('Should initiate payment', async () => {
    const BODY={amount: 100, email: 'sebastien.auvray@free.fr'}
    const EXPECTED=/^https:\/\/demo.vivapayments.com\/web\/checkout\?ref=/
    return expect(initiatePayment(BODY)).resolves.toMatch(EXPECTED)
  })


})
