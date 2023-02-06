const moment = require('moment')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

const User = require('../../server/models/User')
const {
  createUser,
  getNonce,
  getUsers,
  getMeasures,
  getAuthorizationCode,
  getDevices,
} = require('../../server/utils/withings')
const {forceDataModelDekuple} = require('../utils')
const {is_development}=require('../../config/config')
const {GENDER_MALE} = require('../../server/plugins/dekuple/consts')
const {updateTokens} = require('../../server/plugins/dekuple/functions')

forceDataModelDekuple()

describe('Test withings calls on test DB', () => {

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
      firstname: 'Sébastien', lastname: 'Legrand', birthday: moment().add(-50, 'years'),
      cguAccepted: true}
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
    console.log(user.creation_date)
    const since=moment().add(-4, 'days')
    const measures=await getMeasures(user.access_token, since)
    const fmtMeasures={
      ...measures,
      measuregrps: measures.measuregrps.map(g => ({...g, date: moment.unix(g.date)})),
    }
    expect(measures).toBeTruthy()
  })
})

describe.only('Test withings calls on actual DB', () => {

  beforeAll(async() => {
    if (!is_development()) {
      throw new Error('Can run on development mode only')
    }
    await mongoose.connect(`mongodb://localhost/dekuple`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.close()
  })

  it('must return the measures)', async() => {
    await User.update({email: /sebas/}, {$set: {access_token: null}})
    let user=await User.findOne({email: /sebas/})
    user.withings_usercode=(await getAuthorizationCode(user.email))
    user=await updateTokens(user)
    const since=moment().add(-4, 'days')
    const measures=await getMeasures(user.access_token, since)
    const fmtMeasures={
      ...measures,
      measuregrps: measures.measuregrps.map(g => ({...g, date: moment.unix(g.date)})),
    }
    expect(measures).toBeTruthy()
  })

  it('must return the devices)', async() => {
    await User.update({email: /sebas/}, {$set: {access_token: null}})
    let user=await User.findOne({email: /sebas/})
    user.withings_usercode=(await getAuthorizationCode(user.email))
    user=await updateTokens(user)
    const devices=await getDevices(user.access_token)
    console.log(JSON.stringify(devices, null, 2))
    expect(devices).toBeTruthy()
  })


})
