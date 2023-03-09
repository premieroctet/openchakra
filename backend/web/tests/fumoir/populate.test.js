const Event = require('../../server/models/Event')
const mongoose = require('mongoose')
const moment=require('moment')
const {forceDataModelFumoir}=require('../utils')

forceDataModelFumoir()
const {MONGOOSE_OPTIONS, buildPopulates} = require('../../server/utils/database')
require(`../../server/routes/api/studio`)
require('../../server/models/Post')
require('../../server/models/Company')
require('../../server/models/Category')
require('../../server/models/ResetToken')
require('../../server/models/Cigar')

jest.setTimeout(30000)

describe('Test virtual single ref', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('author full_name should populate none', async() => {
    const pops=buildPopulates(['full_name'], 'user')
    expect(pops).toEqual([])
  })

  it('booking paid_str should populate items', async() => {
    const pops=buildPopulates(['paid_str'], 'booking')
    expect(pops).toEqual([{path: 'items'}, {path: 'payments'}])
  })

  it('event invitations should populate memeber & guest', async() => {
    const pops=buildPopulates(['invitations.member', 'invitations.guest'], 'event')
    expect(pops).toEqual([{path: 'invitations', populate: [{path: 'member'}, {path:'guest'}]}])
  })

})
