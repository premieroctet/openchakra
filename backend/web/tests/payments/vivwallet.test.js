const {getAuthToken, initiatePayment, getWebHookToken}=require('../../server/plugins/payment/vivaWallet')

jest.setTimeout(20000)

describe('VivaWallet tests', () => {

  test('Should return token', async() => {
    expect(getAuthToken()).resolves.toMatch(/.+/)
  })

  test('Should initiate payment', async() => {
    const url=await initiatePayment({amount: 100, email: 'sebastien.auvray@free.fr'})
    console.log(url)
    return expect(url).toMatch(/^https:\/\/demo.vivapayments.com\/web\/checkout\?ref=/)
  })

  test('Should get webhook token', async() => {
    return expect(getWebHookToken()).resolves.toMatch(/.+/)
  })


})
