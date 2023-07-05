const {
  MONGOOSE_OPTIONS,
  getMongooseModels
} = require('../../../server/utils/database')
const moment = require('moment')
const mongoose = require('mongoose')
const {forceDataModelSmartdiet}=require('../../utils')
import { readdir } from 'node:fs/promises'

forceDataModelSmartdiet()

describe('Ordering models', ()=> {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    await readdir(`${__dirname}/../../../server/models`)
      .then(files => Promise.all(files.map(f => require(`${__dirname}/../../../server/models/${f}`))))
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  test('check classes hierarchy order', async () => {
    const models=getMongooseModels()
    const event_idx=models.findIndex(m => m.modelName=='event')
    const webinar_idx=models.findIndex(m => m.modelName=='webinar')
    const menu_idx=models.findIndex(m => m.modelName=='menu')
    const collectiveChallenge_idx=models.findIndex(m => m.modelName=='collectiveChallenge')
    const individualChallenge_idx=models.findIndex(m => m.modelName=='individualChallenge')
    expect(webinar_idx).toBeGreaterThan(-1)
    expect(menu_idx).toBeGreaterThan(-1)
    expect(individualChallenge_idx).toBeGreaterThan(-1)
    expect(collectiveChallenge_idx).toBeGreaterThan(-1)

    expect(webinar_idx).toBeLessThan(event_idx)
    expect(menu_idx).toBeLessThan(event_idx)
    expect(individualChallenge_idx).toBeLessThan(event_idx)
    expect(collectiveChallenge_idx).toBeLessThan(event_idx)
  })

})
