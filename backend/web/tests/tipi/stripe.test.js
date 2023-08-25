const {
  getAccounts,
  getCustomers
} = require('../../server/plugins/payment/stripe')
const { updateAccounts } = require('../../scripts/tipi/updateStripe')
const {
  COACH_ALLE,
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAllInclusive}=require('../utils')

forceDataModelAllInclusive()
require('../../server/plugins/all-inclusive/functions')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

jest.setTimeout(40000)

describe('Test stripe account update', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it.skip("Must update acounts", () => {
    return updateAccounts()
  })

  it("Must list customers", () => {
    return getCustomers()
      .then(cust => console.log(cust))
  })

  it.only("Must list providers", () => {
    return getAccounts()
      .then(cust => console.log(cust))
  })

})
