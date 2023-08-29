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
    leadsData=fs.readFileSync(path.resolve(__dirname, 'data/leads.csv')).toString()
  })

  afterEach(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must import leads', async() => {
    await Company.create({name: 'CARCEPT', code: 'CARCEPT', size:100, activity: Object.keys(COMPANY_ACTIVITY)[0]})
    let p=await Lead.find()
    expect(p).toHaveLength(0)
    const result=await importLeads(leadsData)
    expect(result).toHaveLength(2)
    expect(result[0]).toMatch(/ajouté/i)
    expect(result[1]).toMatch(/ajouté/i)
    p=await Lead.find()
    expect(p).toHaveLength(2)
    const result2=await importLeads(leadsData)
    expect(result2[0]).toMatch(/mis à jour/i)
    expect(result2[1]).toMatch(/mis à jour/i)
  })

  it('must fail if no company prospects', async() => {
    let p=await Lead.find()
    expect(p).toHaveLength(0)
    const result=await importLeads(leadsData)
    expect(result).toHaveLength(2)
    expect(result[0]).toMatch(/erreur.*compagnie/i)
    expect(result[1]).toMatch(/erreur.*compagnie/i)
    p=await Lead.find()
    expect(p).toHaveLength(0)
  })

})
