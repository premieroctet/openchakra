const { MONGOOSE_OPTIONS, getModels } = require('../../server/utils/database');
const { getDatabaseUri } = require('../../config/config');
const mongoose = require('mongoose');
require('../../server/models/Company')
require('../../server/models/User')
require('../../server/models/ResetToken')
require('../../server/models/Booking')
require('../../server/models/Order')

describe('Test virtual single ref', () => {

  beforeAll( async () => {
    await mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  })

  it('booking.orders must be ref:true, multiple: true', async () => {
    const models= await getModels()
    const orderParam=models.booking?.attributes?.orders
    console.log(orderParam)
    const EXPECTED={type: 'order', multiple: true, ref:true, enumValues: undefined}
    return expect(orderParam).toMatchObject(EXPECTED)
  })
})
