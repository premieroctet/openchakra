const {
  createPayment,
  createTransfer,
  getAccounts,
  getCheckout,
  getCustomers,
  upsertProvider
} = require('../../../server/plugins/payment/stripe')
const {forceDataModelAllInclusive}=require('../../utils')

forceDataModelAllInclusive()

const moment = require('moment')
const {
  upsertCustomer,
  init
} = require('../../../server/plugins/payment/stripe')

jest.setTimeout(20000)

describe('Stripe tests', () => {

  const USER_DATA={
    email: 'sebastien.auvray@free.fr2', firstname: 'Sébastien', lastname: 'Auvray',
    address:'260 rue Louis Blanc, Rouen', phone: '+33675774324', register_ip: '127.0.0.1',
    birthday: moment().subtract(40, 'year'),
  }

  beforeAll(async() => {
    init({STRIPE_KEY: 'sk_test_51MtrDpFgIHiw1rfz5vd4OlYSgUvHkYKkLRFlwVqu9qNr0H1afOvQzgyHDdqU7MFDumpQHMlI7YL9BUrJgEq6ZlJa00sFUmns1s'})
  })

  afterAll(async() => {
  })

  it('must create a customer', async() => {
    return upsertCustomer({email: `test${moment().valueOf()}@test.com`, firstname: 'Seb', last_name: 'Auvray', full_name: 'Seb Auvray'})
      .then(customer => {
        console.log(customer)
        return customer
      })
  })

  it('must list customers', async() => {
    const customer=(await getCustomers())[0]
    console.log(customer)
  })

  it('must createPayment', async() => {
    const customer=(await getCustomers())[0]
    const ti=(await upsertProvider({payment_account_id: 'acct_1NAqoeFdsYV4dGhn', firstname: 'Georges', lastname: 'Machin',
      birthday: moment().subtract(30, 'year'), phone:'33675774324', address: '12 rue truc à Troyes'}))
    return createPayment({
      source_user: {
        payment_account_id: customer.id
      },
      amount:200,
      fee: 10,
      destination_user: {
        payment_account_id: ti
      },
      description: 'Mission truc'
    })
    .then(p => {
      console.log(p)
    })
  })

  it.only('should display checkout', async() => {
    const session_id='cs_test_a1rRKNodRVwLSyjSnsyH7bACd0oVqXT5LkLa03iy0ZP84b4mTuvO5tXYJg'
    const checkout=await getCheckout(session_id)
    console.log(checkout.status, checkout.payment_status, checkout.url)
  })

  it('must createTransfer', async() => {
    const account=(await getAccounts())[0]
    console.log(account)
    return createTransfer({destination: {payment_account_id: account.id}, amount:500})
      .then(p => console.log(p))
  })

  it('must create a TIPI', async() => {
    const ti=await upsertProvider(USER_DATA)
    console.log(JSON.stringify(ti.external_accounts, null, 2))
    return ti
  })

  it('must update a TIPI', async() => {
    const accounts=await getAccounts()
    const length_before=accounts.length
    const account_before=accounts[0]
    const account_after=await upsertProvider({
      ...USER_DATA,
      payment_account_id: account_before.id,
      email: `${account_before.individual?.email}.blabla`
    })
    const length_after=(await getAccounts()).length
    expect(length_after).toEqual(length_before)
    return expect(account_after.individual?.email).toEqual(`${account_before.individual?.email}.blabla`)
  })

})
