const moment = require('moment')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

const User = require('../../server/models/User')
const {
  createUser,
  getAccessToken,
  getFreshAccessToken,
  getNonce,
} = require('../../server/utils/withings')
const {forceDataModelDekuple} = require('../utils')
const {GENDER_MALE} = require('../../server/plugins/dekuple/consts')

forceDataModelDekuple()

describe('Test withings calls', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it.skip('must return a nonce', async() => {
    return expect(getNonce()).resolves.toBeTruthy()
  })

  it.skip('must create a user', async() => {
    const userdata={
      height: 170, weight: 68, gender: GENDER_MALE, email: 'sebastien.auvray@free.fr',
      firstname: 'Sébastien', lastname: 'Legrand'}
    const usercode=await createUser(userdata)
    expect(usercode).toBeTruthy()
    const tokens=await getAccessToken(usercode)
    expect(tokens).toBeTruthy()
    const newTokens = await getFreshAccessToken(tokens.refresh_token)
    expect(newTokens).toBeTruthy()
  })

  it('must return a fresh token)', async() => {
    let user=await User.findOne({email: /sebas/})
    await user.getAccessToken()
    await User.findOneAndUpdate({email: user.email}, {$set: {expires_at: moment().add(-2, 'days')}})
    user=await User.findOne({email: /sebas/})
    await user.getAccessToken()
    return expect(current).not.toEqual(previous)
  })

})
