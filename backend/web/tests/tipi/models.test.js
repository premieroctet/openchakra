const {
  COACH_ALLE,
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const Skill = require('../../server/models/Skill')
const User = require('../../server/models/User')
const JobUser = require('../../server/models/JobUser')
const Mission = require('../../server/models/Mission')
require('../../server/models/Mission')
const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAllInclusive}=require('../utils')

forceDataModelAllInclusive()
require('../../server/plugins/all-inclusive/functions')
const {MONGOOSE_OPTIONS, getExposedModels} = require('../../server/utils/database')

jest.setTimeout(20000)

describe('Test DB', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    const user=await User.create({
        firstname: 'Sébastien', lastname: 'Auvray', birthday: moment(), cguAccepted: true,
        password: 'prout', email: 's@a.com', coaching: COACH_ALLE, role: ROLE_TI})
    const job=await JobUser.create({name: 'Peintre', user})
    await Skill.create({name: 'A skill', job})
    await Mission.create({
      name: 'A mission', job, user, description:'Belle mission',
    })
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must load skills', async() => {
    const skill=await Skill.findOne()
    const user=await User.findOne().populate({"path":"jobs","populate":"skills"})
    expect(user.jobs[0].skills[0].toObject()).toMatchObject(skill.toObject())
  })

  it('must display jobUser.location_str', async() => {
    await JobUser.update({customer_location: false, foreign_location: false})
    expect((await JobUser.findOne()).location_str).toEqual('')
    await JobUser.update({customer_location: true, foreign_location: false})
    expect((await JobUser.findOne()).location_str).toEqual('Chez le client')
    await JobUser.update({customer_location: false, foreign_location: true})
    expect((await JobUser.findOne()).location_str).toEqual('À distance')
    await JobUser.update({customer_location: true, foreign_location: true})
    expect((await JobUser.findOne()).location_str).toEqual('Chez le client et à distance')
  })

  it('must return level 2 attributes', async() => {
    const models=getExposedModels()
    const attrs=Object.keys(models.mission.attributes.value())
    expect(attrs).toContain('job.user.full_name')
  })

  it('getModels must not cycle', async() => {
    expect(() => getExposedModels()).not.toThrowError(RangeError)
  })

  it('must display mission.location_str', async() => {
    await Mission.update({customer_location: false, foreign_location: false})
    expect((await Mission.findOne()).location_str).toEqual('')
    await Mission.update({customer_location: true, foreign_location: false})
    expect((await Mission.findOne()).location_str).toEqual('Chez le client')
    await Mission.update({customer_location: false, foreign_location: true})
    expect((await Mission.findOne()).location_str).toEqual('À distance')
    await Mission.update({customer_location: true, foreign_location: true})
    expect((await Mission.findOne()).location_str).toEqual('Chez le client et à distance')
  })

})
