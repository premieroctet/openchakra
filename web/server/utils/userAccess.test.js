const axios = require('axios')
const lodash=require('lodash')
const mongoose = require('mongoose')

jest.mock('../../config/config')
const config=require('../../config/config')
const configActual=jest.requireActual('../../config/config')
config.getDatabaseUri = () => { console.log('calling get URI'); return 'mongodb://localhost/test' }
config.getDataModel = () => 'feurst'
config.getSibTemplates= () => 'my-alfred'
config.get_host_url = () => 'https://localhost'
config.checkConfig = () => Promise.resolve()

jest.mock('./mangopay')
const mangopay=require('./mangopay')
mangopay.install_hooks = () => {}

const OrderSchema = require('../models/feurst/OrderSchema')
const ProductSchema = require('../models/feurst/ProductSchema')
const UserSchema = require('../models/feurst/UserSchema')
const CompanySchema = require('../models/CompanySchema')
const {
  CUSTOMER_ADMIN,
  CUSTOMER_SLAVE,
  ROLES,
} = require('../../utils/feurst/consts')


const {MONGOOSE_OPTIONS} = require('./database')

let User=null
let Company=null
let Product=null
let Order=null

describe('Orders/quotation access tests', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
      .then(() => {
        Company=mongoose.model('companies', CompanySchema)
        User=mongoose.model('users', UserSchema)
        Product=mongoose.model('products', ProductSchema)
        Order=mongoose.model('orders', OrderSchema)
        mongoose.model('resetTokens', OrderSchema)
        return Promise.all([1, 2].map(nb => Company.create({name: `Company ${nb}`})))
      })
      .then(comps => {
        const masters=lodash.flattenDeep(comps.map(company => [CUSTOMER_ADMIN, CUSTOMER_SLAVE].map(role =>
          User.create({email: `${role}@${company.name}.fr`, firstname: `${ROLES[role]} ${company.name}`, name: `${ROLES[role]} ${company.name}`, company: company, password: 'TEST', roles: [role]}))))
        return Promise.all(masters)
      })
      .then(() => {
        return Promise.all([1, 2, 3].map(p => Product.create({reference: `REF_${p}`, weight: p*10, description: `Produit ${p}`})))
      })
      .then(() => {
        return User.find()
      })
      .then(users => {
        return Promise.all(users.map(user => Order.create({reference: `Order ${user.name}`, user: user, address: {address: `Rue ${user.avatar_letters}`, zipcode: 76430}})))
      })
  })

  afterAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
      .then(() => {
        return mongoose.connection.db.dropDatabase()
      })
  })

  const displayDBContents = () => {
    return Promise.all([User, Company, Product, Order].map(model => model.find()))
      .then(res => {
        res.forEach(r => {
          return console.log(`${JSON.stringify(r)}`)
        })
      })
  }

  test('Data count', () => {
    // return displayDBContents()
    return Promise.resolve()
      .then(() => {
        return Company.count()
      })
      .then(count => {
        expect(count).toBe(2)
        return User.count()
      })
      .then(count => {
        expect(count).toBe(4)
        return Product.count()
      })
      .then(count => {
        expect(count).toBe(3)
      })
  })

  test('Server', () => {
    require('../server')
    const f= () => {
      return axios.get('https://localhost/myAlfred/api/orders')
        .then(res => {
          return console.log(res)
        })
    }
    setTimeout(f, 2000)
  })

})
