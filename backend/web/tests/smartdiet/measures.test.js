const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')
forceDataModelSmartdiet()

require('../../server/plugins/smartdiet/functions')
const {ROLE_ADMIN} = require('../../server/plugins/smartdiet/consts')

const moment=require('moment')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS, loadFromDb} = require('../../server/utils/database')

const Measure=require('../../server/models/Measure')
const User=require('../../server/models/User')
require('../../server/models/Company')
require('../../server/models/Key')

describe('Measure model ', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must display last measures', async() => {
    const user=await User.create({firstname: 'admin', lastname: 'admin', email:'tagada@tsoin.com', role: ROLE_ADMIN})
    await Measure.create({"date" : new Date(), "chest" : 0, "waist" : 0, "hips" : 0, "thighs" : 15, "arms" : null, "weight" : 25, "user" : user._id })
    await Measure.create({"date" : new Date(), "chest" : 5, "waist" : 0, "hips" : 0, "thighs" : 0, "arms" : null, "weight" : 0, "user" : user._id })
    await Measure.create({"date" : new Date(), "chest" : 0, "waist" : 0, "hips" : 0, "thighs" : 0, "arms" : null, "weight" : 0, "user" : user._id })
    await Measure.create({"date" : new Date(), "chest" : 0, "waist" : 10, "hips" : 0, "thighs" : 0, "arms" : null, "weight" : 35, "user" : user._id })
    await Measure.create({"date" : new Date(), "chest" : 0, "waist" : 0, "hips" : 0, "thighs" : 0, "arms" : null, "weight" : null, "user" : user._id })
    await Measure.create({"date" : new Date(), "chest" : null, "waist" : 0, "hips" : 0, "thighs" : 0, "arms" : null, "weight" : 2, "user" : user._id })
    const measures=await Measure.find({user: user._id})
    const users=await loadFromDb({model: 'user', fields:["last_measures"], id: user._id})
    expect(users[0].last_measures).toMatchObject({chest:5, waist: 10, hips: null, thighs:15, arms: null, weight:2})
  })

})
