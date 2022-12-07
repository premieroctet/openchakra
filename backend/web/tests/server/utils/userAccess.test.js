const https = require('https')
const axios = require('axios')
const {
  CUSTOMER_BUYER,
  FEURST_ADMIN,
  FEURST_ADV,
} = require('../../../utils/feurst/consts')
const {login}=require('../../utils')

https.globalAgent.options.rejectUnauthorized = false

const setRole = role => {
  return axios.put('https://localhost/myAlfred/api/users/current', {roles: [role]})
}

const createUser = (firstname, name, company) => {
  return axios.put('https://localhost/myAlfred/api/users/current', {is_admin: true})
    .then(() => {
      return axios.post('https://localhost/myAlfred/api/admin/feurst_register', {
        firstname: firstname,
        name: name,
        company: company,
        email: `${firstname}.${name}@${company}.com`,
        role: FEURST_ADMIN,
        password: 'tagada',
      })
        .then(() => Promise.resolve())
        .catch(err => { console.error(err); return Promise.reject(err) })
    })
}
describe('Orders/quotation access tests', () => {

  beforeAll(() => {
    return login('sebastien.auvray@my-alfred.io')
      .then(() => {
        return createUser('prenom', 'nom', 'compagnie')
      })
  })

  afterAll(() => {
  })

  const checkOrders = (role, number) => {
    return setRole(role)
      .then(() => {
        return axios.get('https://localhost/myAlfred/api/orders')
      })
      .then(res => {
        const orders=res.data
        expect(orders.length).toBe(number)
      })
  }
  test('Rôle client esclave', () => {
    return checkOrders(CUSTOMER_BUYER, 1)
  })

  test('Rôle FEURST ADMIN', () => {
    return checkOrders(FEURST_ADMIN, 2)
  })

  test('Rôle FEURST ADV', () => {
    return checkOrders(FEURST_ADV, 2)
  })

})
