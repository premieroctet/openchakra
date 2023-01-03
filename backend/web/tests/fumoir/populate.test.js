const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS, buildPopulates} = require('../../server/utils/database')
const {getDataModel} = require('../../config/config')
require(`../../server/routes/api/studio`)
require('../../server/models/Post')
require('../../server/models/Company')
require('../../server/models/Category')
require('../../server/models/ResetToken')

describe('Test virtual single ref', () => {

  beforeAll(async() => {
    if (getDataModel()!='fumoir') { throw new Eror('Expected "fumoir" datamodel') }
    await mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
    await mongoose.connection.dropDatabase()
  })

  it('author full_name should populate none', async() => {
    const pops=buildPopulates(['full_name'], 'user')
    expect(pops).toEqual([])
  })

  it('user company_name should populate company', async() => {
    const pops=buildPopulates(['company_name'], 'user')
    expect(pops).toEqual([{path: 'company'}])
  })

  it('order paid_str should populate items', async() => {
    const pops=buildPopulates(['paid_str'], 'order')
    expect(pops).toEqual([{path: 'items'}])
  })

  it('booking paid_str should populate items', async() => {
    const pops=buildPopulates(['paid_str'], 'booking')
    expect(pops).toEqual([{path: 'orders', populate: {path: 'items'}}])
  })

  it('post author company should populate company', async() => {
    const pops=buildPopulates(['author.company_name'], 'post')
    expect(pops).toEqual([{path: 'author', populate: {path: 'company'}}])
  })
})
