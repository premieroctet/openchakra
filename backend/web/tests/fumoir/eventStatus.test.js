const mongoose = require('mongoose')
const moment = require('moment')
const {forceDataModelFumoir}=require('../utils')
forceDataModelFumoir()
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const {TO_COME, FINISHED, CURRENT}=require('../../server/plugins/fumoir/consts')
const Event=require('../../server/models/Event')

jest.setTimeout(20000)

describe('Test virtual single ref', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('Must have proper status', async() => {
    const yesterday=moment().add(-1, 'days')
    const tomorrow=moment().add(1, 'days')
    const [evToCome, evCurrent, evFinished, evUndefined]=await Event.create([
      {start_date: tomorrow},
      {start_date: yesterday, end_date: tomorrow},
      {end_date: yesterday},
      {},
    ])
    expect(evToCome.status).toEqual(TO_COME)
    expect(evCurrent.status).toEqual(CURRENT)
    expect(evFinished.status).toEqual(FINISHED)
    return expect(evUndefined.status).toEqual(null)
  })
})
