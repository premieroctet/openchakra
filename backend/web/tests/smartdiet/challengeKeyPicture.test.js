const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')

forceDataModelSmartdiet()
require('../../server/plugins/smartdiet/functions')
const IndividualChallenge = require('../../server/models/IndividualChallenge')
const User = require('../../server/models/User')
const Key = require('../../server/models/Key')
const Content = require('../../server/models/Content')
const Comment = require('../../server/models/Comment')

const moment=require('moment')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS, loadFromDb} = require('../../server/utils/database')

describe('Challenge.key.picture ', () => {

  beforeAll(async() => {
    //await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    await mongoose.connect(`mongodb://localhost/smartdiet`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    //await mongoose.connection.close()
  })

  it('must load challenge.key.picture', async() => {
    const challenges=await IndividualChallenge.find()
     .populate([{"path":"key", populate: []}])
    console.log(challenges.map(c => c.key.picture))
  })

  it('must load user.challenge.key.picture', async() => {
    const users=await User.find()
     .populate([{"path": '_all_individual_challenges'}, {"path":"individual_challenges","populate":{"path":"key"}}])
    expect(users[0]?.individual_challenges[0]?.key?.picture).toBeTruthy()
  })

})
