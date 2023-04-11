const https=require('https')
const moment=require('moment')
const lodash=require('lodash')
const mongoose = require('mongoose')
const axios=require('axios')
const {forceDataModelDekuple}=require('../utils')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const User = require('../../server/models/User')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
forceDataModelDekuple()

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

describe('Test dekuple actions', () => {

  let USER_DATA={
    email: `sebastien.auvray${moment().valueOf()}@free.fr`, password: '600Bimota!', password2: '600Bimota!',
    firstname: 'Sébastien', lastname: 'Auvray', gender: 'MALE', birthday: moment(),
    cguAccepted: true, dataTreatmentAccepted: true,
  }

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('Must register', async() => {
    const user_data={...USER_DATA, email:`sebastien.auvray${moment().valueOf()}@free.fr`}
    return instance.post(
      'https://localhost/myAlfred/api/studio/register',
      lodash.mapValues(user_data, v => JSON.stringify(v)),
    )
  })

  it('Must register then login', async() => {
    return instance.post(
      'https://localhost/myAlfred/api/studio/register-and-login',
      lodash.mapValues(USER_DATA, v => JSON.stringify(v)),
    )
  })

  it('Must login', async() => {
    return instance.post(
      'https://localhost/myAlfred/api/studio/login',
      {email: USER_DATA.email, password: USER_DATA.password},
    )
  })


})
