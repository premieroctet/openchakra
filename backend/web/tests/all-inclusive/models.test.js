const Skill = require('../../server/models/Skill')
const { COACH_ALLE } = require('../../server/plugins/all-inclusive/consts')
const User = require('../../server/models/User')
const JobUser = require('../../server/models/JobUser')
const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAllInclusive}=require('../utils')

forceDataModelAllInclusive()
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

jest.setTimeout(20000)

describe('Test virtual single ref', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    const user=await User.create({
        firstname: 'Sébastien', name: 'Auvray', birthday: moment(), cguAccepted: true,
        password: 'prout', email: 's@a.com', coaching: COACH_ALLE})
    const job=await JobUser.create({name: 'Peintre', user})
    const skill=await Skill.create({name: 'A skill', job})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must load skills', async() => {
    const skills=await Skill.find()
    const user=await User.findOne().populate({"path":"jobs","populate":"skills"})
    expect(user.jobs[0].skills).toHaveLength(1)
    await JobUser.update({customer_location: false, foreign_location: false})
    expect((await JobUser.findOne()).location_str).toEqual('')
    await JobUser.update({customer_location: true, foreign_location: false})
    expect((await JobUser.findOne()).location_str).toEqual('Chez le client')
    await JobUser.update({customer_location: false, foreign_location: true})
    expect((await JobUser.findOne()).location_str).toEqual('À distance')
    await JobUser.update({customer_location: true, foreign_location: true})
    expect((await JobUser.findOne()).location_str).toEqual('Chez le client e à distance')
  })

})
