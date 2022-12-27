const { MONGOOSE_OPTIONS, getModels } = require('../../server/utils/database');
const { getDatabaseUri } = require('../../config/config');
const mongoose = require('mongoose');
const moment = require('moment');
const {TO_COME, FINISHED, CURRENT}=require('../../utils/fumoir/consts')
const Event=require('../../server/models/Event')

describe('Test virtual single ref', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
        .then(() => mongoose.connection.dropDatabase())
  })

  it('Must have proper status', async () => {
    const yesterday=moment().add(-1, 'days')
    const tomorrow=moment().add(1, 'days')
    const [evToCome, evCurrent, evFinished, evUndefined]=await Event.create([
      {start_date: tomorrow},
      {start_date: yesterday, end_date: tomorrow},
      {end_date: yesterday},
      {}
    ])
    expect(evToCome.status).toEqual(TO_COME)
    expect(evCurrent.status).toEqual(CURRENT)
    expect(evFinished.status).toEqual(FINISHED)
    return expect(evUndefined.status).toEqual(null)
  })
})
