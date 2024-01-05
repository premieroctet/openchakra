const mongoose = require('mongoose')
const moment = require('moment')
const lodash = require('lodash')
const path = require('path')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const { importUsers, importDiets, importDietsAgenda, importCoachings } = require('../../server/plugins/smartdiet/import')
const { forceDataModelSmartdiet } = require('../utils')
forceDataModelSmartdiet()
const User = require('../../server/models/User')
const Company = require('../../server/models/Company')
require('../../server/models/Content')
require('../../server/models/Comment')
const { COMPANY_ACTIVITY_BANQUE, ROLE_EXTERNAL_DIET, ROLE_CUSTOMER } = require('../../server/plugins/smartdiet/consts')
const bcrypt = require('bcryptjs')
const Coaching = require('../../server/models/Coaching')

const ROOT = path.join(__dirname, './data/migration')

jest.setTimeout(600000)

describe('Test imports', () => {

  beforeAll(async () => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  const ensureNoError = result => {
    const errors=result.filter(r => r.status=='rejected').map(r => r.reason)
    expect(errors).toHaveLength(0)
  }

  it('must import users', async () => {
    const res = await importUsers(path.join(ROOT, 'smart_patient.csv'))
    ensureNoError(res)
    const users=await User.find({role: ROLE_CUSTOMER})
    expect(users.length).toEqual(12323)
  })

  it('must import diets', async () => {
    let res = await importDiets(path.join(ROOT, 'smart_diets.csv'))
    ensureNoError(res)
    const users=await User.find({role: ROLE_EXTERNAL_DIET})
    expect(users.length).toEqual(53)
  })

  it('must upsert diets', async () => {
    let res = await importDiets(path.join(ROOT, 'smart_diets.csv'))
    ensureNoError(res)
    console.log('--------------------------------------------------------')
    res = await importDiets(path.join(ROOT, 'smart_diets.csv'))
    ensureNoError(res)
    const users=await User.find({role: ROLE_EXTERNAL_DIET})
    expect(users.length).toEqual(53)
  })

  it('must upsert diet agendas', async () => {
    let res = await importDietsAgenda(path.join(ROOT, 'smart_diet_agenda.csv'))
    ensureNoError(res)
    const users=await User.find({role: ROLE_EXTERNAL_DIET})
    expect(users.length).toEqual(53)
    expect(users.filter(u => !u.smartagenda_id).length).toBeGreaterThan(0)
  })

  it('must upsert coachings', async () => {
    let res = await importCoachings(path.join(ROOT, 'smart_coaching.csv'))
    ensureNoError(res)
    const coachings=await Coaching.find()
    console.log(coachings[0])
    await coachings[0].save()
  })

})
