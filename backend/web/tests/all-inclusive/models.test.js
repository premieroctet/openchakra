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
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must load skills', async() => {
    const user=await User.create({
      firstname: 'Sébastien', name: 'Auvray', birthday: moment(), cguAccepted: true,
      password: 'prout', email: 's@a.com', coaching: COACH_ALLE})
    const job=await JobUser.create({name: 'Peintre', user})
    const skill=await Skill.create({name: 'A skill', job})
    const skills=await Skill.find()
    const jobs=await User.find().populate({"path":"jobs","populate":"skills"})
    console.log(JSON.stringify(skills, null, 2))
    console.log(JSON.stringify(jobs, null, 2))
  })

})
