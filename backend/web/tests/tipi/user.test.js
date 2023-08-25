const {
  COACH_ALLE,
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const User = require('../../server/models/User')
const JobUser = require('../../server/models/JobUser')
const Recommandation = require('../../server/models/Recommandation')
const Comment = require('../../server/models/Comment')
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
    await Recommandation.create({
      title:'a', firstname:'a', lastname: 'a', user, job, comment:'Bien joué', note:3
    })
    await Comment.create({user, job, comment:'Comment', note:2, title: 'Bravo'})
    await Comment.create({user, job, comment:'Comment', note:4, title: 'Bravo'})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it("Must compute finished_missions_count", async() => {
  })

  it("Must compute recommandations_count", async() => {
    const user=await User.findOne()
      .populate({path: 'jobs', populate: {path: 'recommandations'}})
    expect(user.recommandations_count).toEqual(2)
  })

  it("Must compute recommandations_note", async() => {
    const user=await User.findOne()
      .populate({path: 'jobs', populate: {path: 'recommandations'}})
    expect(user.recommandations_note).toEqual(2.5)
  })

  it("Must compute comments_count", async() => {
    const user=await User.findOne()
      .populate({path: 'jobs', populate: {path: 'comments'}})
    expect(user.comments_count).toEqual(2)
  })

  it("Must compute comments_note", async() => {
    const user=await User.findOne()
      .populate({path: 'jobs', populate: {path: 'comments'}})
    expect(user.comments_note).toEqual(3)
  })

  it("Must compute revenue", async() => {
  })

  it("Must compute revenue_to_come", async() => {
  })

  it("Must compute accepted_quotations_count", async() => {
  })

  it("Must compute profile_shares_count", async() => {
  })

})
