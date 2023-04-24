const {
  COACH_ALLE,
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const Mission = require('../../server/models/Mission')
const User = require('../../server/models/User')
const JobUser = require('../../server/models/JobUser')
const Quotation = require('../../server/models/Quotation')
const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAllInclusive}=require('../utils')

forceDataModelAllInclusive()
require('../../server/plugins/all-inclusive/functions')
const {MONGOOSE_OPTIONS, buildQuery} = require('../../server/utils/database')
const {inspect}=require('util')
jest.setTimeout(20000)

describe('Test whole populates', () => {

  let user
  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    user=await User.create({
        firstname: 'Sébastien', lastname: 'Auvray', birthday: moment(), cguAccepted: true,
        password: 'prout', email: 's@a.com', coaching: COACH_ALLE, role: ROLE_TI})
    const job=await JobUser.create({name: 'Peintre', user})
    const mission=await Mission.create({user, name:'Mision', description:'Description', job})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('mongo must load missions.job.user.full_name', async() => {
    const m=await Mission.findOne()
        .populate({path: 'job', populate:{path: 'user'}})
    expect(m.job.user.full_name).toEqual(`${user.firstname} ${user.lastname}`)
  })

  it('populate must load missions.job.user.full_name', async() => {
    const query=await buildQuery('mission', null, ['job.user.full_name'])
    const missions=await query
    expect(missions[0].job.user.full_name).toEqual(`${user.firstname} ${user.lastname}`)
  })

  it.only('mongo must load job.missions.job', async() => {
    const job=await JobUser.findOne()
      .populate({path: "missions",populate: {"path": "job", populate: {path: 'user'}}})
    expect(job.missions?.[0]?.job?.user?.full_name).toEqual(user.full_name)
  })

})
