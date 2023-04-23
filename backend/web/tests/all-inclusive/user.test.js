const {
  COACH_ALLE,
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const User = require('../../server/models/User')
const JobUser = require('../../server/models/JobUser')
const Recommandation = require('../../server/models/Recommandation')
const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAllInclusive}=require('../utils')

forceDataModelAllInclusive()
require('../../server/plugins/all-inclusive/functions')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

jest.setTimeout(40000)

describe('Test user model', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    const user=await User.create({
        firstname: 'Sébastien', lastname: 'Auvray', birthday: moment(), cguAccepted: true,
        password: 'prout', email: 's@a.com', coaching: COACH_ALLE, role: ROLE_TI})
    const job=await JobUser.create({name: 'Peintre', user})
    await Recommandation.create({
      title:'a', firstname:'a', lastname: 'a', user, job, comment:'Bien joué', note:2
    })
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it("Must compute finished_missions_count", async() => {
  })

  it.only("Must compute recommandations_count", async() => {
    console.log(await Recommandation.findOne().populate('job'))
    console.log(await User.findOne())
    const user=await User.findOne()
      .populate({path: 'recommandations', populate: {path: 'job'}})
    expect(user.recommandations_count).toEqual(1)
  })

  it("Must compute recommandations_note", async() => {
  })

  it("Must compute comments_note", async() => {
  })

  it("Must compute revenue", async() => {
  })

  it("Must compute revenue_to_come", async() => {
  })

  it("Must compute accepted_quotations_count", async() => {
  })

  it("Must compute commments_count", async() => {
  })

  it("Must compute profile_shares_count", async() => {
  })

})
