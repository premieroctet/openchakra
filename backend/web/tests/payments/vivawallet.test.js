const {getAuthToken, initiatePayment, getWebHookToken}=require('../../server/plugins/payment/vivaWallet')

jest.setTimeout(20000)

describe('VivaWallet tests', () => {

  test('Should return token', () => {
    return expect(getAuthToken()).resolves.toMatch(/.+/)
  })

  test('Should get webhook token', () => {
    return expect(getWebHookToken()).resolves.toMatch(/.+/)
  })

  test.only('Should initiate payment', () => {
    const BODY={amount: 100, email: 'sebastien.auvray@free.fr'}
    const EXPECTED=/^https:\/\/demo.vivapayments.com\/web\/checkout\?ref=/
    return expect(initiatePayment(BODY)).resolves.toMatch(EXPECTED)
  })


})
