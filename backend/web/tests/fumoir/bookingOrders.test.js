const moment=require('moment')
const {forceDataModelFumoir}=require('../utils')
forceDataModelFumoir()

const {MONGOOSE_OPTIONS, getModels} = require('../../server/utils/database')
const mongoose = require('mongoose')
require('../../server/models/Company')
require('../../server/models/User')
require('../../server/models/ResetToken')
require('../../server/models/Booking')
require('../../server/models/Order')
require('../../server/models/Category')
require('../../server/models/Cigar')

jest.setTimeout(30000)

describe('Test virtual single ref', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
  })

  it('booking.payments must be ref:true, multiple: true', async() => {
    const models= await getModels()
    const orderParam=models.booking?.attributes?.payments
    const EXPECTED={type: 'payment', multiple: true, ref: true, enumValues: undefined}
    return expect(orderParam).toMatchObject(EXPECTED)
  })
})
