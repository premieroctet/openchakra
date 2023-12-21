const { COMPANY_DATA } = require('./data/modelsBaseData')
const { COMPANY_ACTIVITY } = require('../../server/plugins/smartdiet/consts')
const Company = require('../../server/models/Company')
const { importLeads } = require('../../server/plugins/smartdiet/leads')
const path=require('path')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const fs=require('fs')
const moment = require('moment')
const mongoose = require('mongoose')
const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')

forceDataModelSmartdiet()

const Lead=require('../../server/models/Lead')
require('../../server/models/Content')
require('../../server/models/Comment')

describe('Prospects', () => {

  let leadsData
  beforeEach(async () => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    leadsData=Buffer.from(fs.readFileSync(path.resolve(__dirname, 'data/leads.csv')).toString())
  })

  afterEach(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must fail if no email', async() => {
    await Company.create({name: 'CARWappizyCEPT', code: 'WAPNUTRITION', size:100, activity: Object.keys(COMPANY_ACTIVITY)[0]})
    let p=await Lead.find()
    expect(p).toHaveLength(0)
    const result=await importLeads(leadsData)
    console.log(result)
    expect(result[0]).toMatch(/erreur.*email/i)
  })

})
