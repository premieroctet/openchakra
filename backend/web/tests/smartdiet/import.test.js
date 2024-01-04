const mongoose=require('mongoose')
const moment=require('moment')
const path=require('path')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const { importUsers } = require('../../server/plugins/smartdiet/import')
const {forceDataModelSmartdiet}=require('../utils')
forceDataModelSmartdiet()
const User=require('../../server/models/User')

const ROOT='/Users/seb/Downloads/smart_partial_export'

jest.setTimeout(600000)

describe('Test imports', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it.only('must import users', async() => {
    await importUsers(path.join(ROOT, 'smart_patient.csv'))
    const usersCount=await User.countDocuments()
    return expect(usersCount).toEqual(12329)
  })

})
