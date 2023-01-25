const moment = require('moment')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

const User = require('../../server/models/User')
const {
  createUser,
  getNonce,
  getUsers,
  getMeasures,
} = require('../../server/utils/withings')
const {forceDataModelDekuple} = require('../utils')
const {GENDER_MALE} = require('../../server/plugins/dekuple/consts')
const {updateTokens} = require('../../server/plugins/dekuple/functions')

forceDataModelDekuple()

describe('Test withings calls', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must return a nonce', async() => {
    return expect(getNonce()).resolves.toBeTruthy()
  })

  it('must create a user', async() => {
    const userdata={
      height: 170, weight: 68, gender: GENDER_MALE, email: 'sebastien.auvray@free.fr',
      firstname: 'Sébastien', lastname: 'Legrand', birthday: moment().add(-50, 'years')}
    const usercode=await createUser(userdata)
    const user=await User.create({...userdata, withings_usercode: usercode})
    expect(user.withings_usercode).toBeTruthy()
    expect(user.access_token).toBeFalsy()
    await updateTokens(user)
    const prevToken=user.access_token
    expect(prevToken).toBeTruthy()
    await updateTokens(user)
    const currToken=user.access_token
    expect(currToken).toBeTruthy()
    expect(currToken).not.toEqual(prevToken)
  })

  it('must return the users)', async() => {
    expect(getUsers()).resolves.toBeTruthy()
  })

  it('must return the measures)', async() => {
    const user=await User.findOne()
    const since=moment().add(-4, 'days')
    expect(getMeasures(user.access_token, since)).resolves.toBeTruthy()
  })

})
