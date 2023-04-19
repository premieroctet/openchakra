const {
  COACH_ALLE,
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const User = require('../../server/models/User')
const Recommandation = require('../../server/models/Recommandation')
const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAllInclusive}=require('../utils')

forceDataModelAllInclusive()
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

jest.setTimeout(40000)

describe('Test virtual single ref', () => {

  var user
  var job

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    user=await User.create({
        firstname: 'Sébastien', lastname: 'Auvray', birthday: moment(), cguAccepted: true,
        password: 'prout', email: 's@a.com', coaching: COACH_ALLE, role: ROLE_TI})
    job=await JobUser.create({name: 'Peintre', user})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it("Must compute finished_missions_count", async() => {
  })

  it("Must compute recommandations_count", async() => {
    await Recommandation.create({title:'a', firstname:'a', lastname: 'a', user})
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
