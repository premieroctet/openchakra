const {
  PARTICULAR_COMPANY_NAME,
  REGISTRATION_WARNING_CODE_MISSING,
  REGISTRATION_WARNING_LEAD_MISSING
} = require('../../server/plugins/smartdiet/consts')
const { COMPANY_DATA, USER_DATA } = require('./data/modelsBaseData')

const { ACTIONS } = require('../../server/utils/studio/actions')
const moment=require('moment')
const mongoose = require('mongoose')
const lodash = require('lodash')
const {MONGOOSE_OPTIONS, loadFromDb, putAttribute} = require('../../server/utils/database')

const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')

forceDataModelSmartdiet()

require('../../server/plugins/smartdiet/functions')
require('../../server/plugins/smartdiet/actions')

const User=require('../../server/models/User')
const Lead=require('../../server/models/Lead')
const Company=require('../../server/models/Company')
require('../../server/models/LogbookDay')

describe('Registration', () => {

  const integ_company_code='INTEGRITY_COMPANY'
  const no_integ_company_code='NO_INTEGRITY_COMPANY'
  const REGISTER_ACTION=ACTIONS.register

  beforeAll(async () => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    await Company.create({...COMPANY_DATA, name: integ_company_code, code: integ_company_code, registration_integrity: true})
    await Company.create({...COMPANY_DATA, name: no_integ_company_code, code: no_integ_company_code, registration_integrity: false})
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  // Remove all users after each test
  afterEach(async () => {
    await User.remove({})
    await Lead.remove({})
  })

  it('must not register if company code unkown', async() => {
    expect(REGISTER_ACTION({...USER_DATA, company_code: 'TRT'})).rejects.toThrow(/Code entreprise.*inconnu/)
    const usersCount=await User.countDocuments()
    expect(usersCount).toEqual(0)
  })

  it('must register as freemium if not company code & no lead', async() => {
    await REGISTER_ACTION({...USER_DATA})
    const users=await User.find().populate('company')
    expect(users).toHaveLength(1)
    const user=users[0]
    expect(user.company.name).toEqual(PARTICULAR_COMPANY_NAME)
    expect(user.registration_warning).toBeFalsy()
  })

  it('No integrity check: must register as company if code and lead', async() => {
    const lead=await Lead.create({...USER_DATA, company_code: no_integ_company_code})
    await REGISTER_ACTION({...USER_DATA, company_code: no_integ_company_code})
    const users=await User.find().populate('company')
    expect(users).toHaveLength(1)
    const user=users[0]
    expect(user.company.name).toEqual(no_integ_company_code)
    expect(user.registration_warning).toBeFalsy()
  })

  it('No integrity check: must register as company if no code and is lead', async() => {
    const lead=await Lead.create({...USER_DATA, company_code: no_integ_company_code})
    await REGISTER_ACTION({...USER_DATA})
    const users=await User.find().populate('company')
    expect(users).toHaveLength(1)
    const user=users[0]
    expect(user.company.name).toEqual(no_integ_company_code)
    expect(user.registration_warning).toBeFalsy()
  })

  it('No integrity check: must register as company if code and no lead', async() => {
    await REGISTER_ACTION({...USER_DATA, company_code: no_integ_company_code})
    const users=await User.find().populate('company')
    expect(users).toHaveLength(1)
    const user=users[0]
    expect(user.company.name).toEqual(no_integ_company_code)
    expect(user.registration_warning).toBeFalsy()
  })

  it('Integrity check: must register as freemium with warning if code and no lead', async() => {
    await REGISTER_ACTION({...USER_DATA, company_code: integ_company_code})
    const users=await User.find().populate('company')
    expect(users).toHaveLength(1)
    const user=users[0]
    expect(user.company?.name).toEqual(PARTICULAR_COMPANY_NAME)
    expect(user.registration_warning).toEqual(REGISTRATION_WARNING_LEAD_MISSING)
  })

  it('Integrity check: must register as freemium with warning if no code and lead', async() => {
    const lead=await Lead.create({...USER_DATA, company_code: integ_company_code})
    await REGISTER_ACTION({...USER_DATA})
    const users=await User.find().populate('company')
    expect(users).toHaveLength(1)
    const user=users[0]
    expect(user.company?.name).toEqual(PARTICULAR_COMPANY_NAME)
    expect(user.registration_warning).toEqual(REGISTRATION_WARNING_CODE_MISSING)
  })

})
