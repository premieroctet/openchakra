const {getAuthToken, initiatePayment, getWebHookToken}=require('../../server/plugins/payment/vivaWallet')

jest.setTimeout(20000)

const describeFn=process.platform=='darwin' ? describe.skip: describe

describeFn('VivaWallet tests', () => {
  test('Should return token', async() => {
    return expect(getAuthToken()).resolves.toMatch(/.+/)
  })

  test('Should get webhook token', async() => {
    return expect(getWebHookToken()).resolves.toMatch(/.+/)
  })

  test('Should initiate payment', async() => {
    const BODY={amount: 100, email: 'sebastien.auvray@free.fr'}
    const EXPECTED=/^https:\/\/demo.vivapayments.com\/web\/checkout\?ref=/
    return expect(initiatePayment(BODY)).resolves.toMatch(EXPECTED)
  })


})
