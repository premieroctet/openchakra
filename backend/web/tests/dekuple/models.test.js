const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelDekuple}=require('../utils')
forceDataModelDekuple()
const {GENDER_MALE, REMINDER_MEDICATION}=require('../../utils/dekuple/consts')
const User = require('../../server/models/User')
const Reminder = require('../../server/models/Reminder')
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

  it('reminder days must be unique', async() => {
    const userPromise=User.create(
      [{email: 'test@a.com', firstname: 'A', birthday: Date.now(), lastname: 'S',
        password: 'INVALID', gender: GENDER_MALE}],
      {runValidators: true},
    )
    expect(userPromise).resolves.not.toThrowError()
    const [user]=await userPromise

    const reminder=Reminder.create(
      [{type: REMINDER_MEDICATION, time: Date.now(), user}],
      {runValidators: true})
    return expect(reminder).resolves.not.toThrowError()
  })
})
