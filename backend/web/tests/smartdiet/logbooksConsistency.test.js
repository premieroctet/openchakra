const lodash=require('lodash')
const {
  logbooksConsistency
} = require('../../server/plugins/smartdiet/functions')
const mongoose = require('mongoose')

const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')

forceDataModelSmartdiet()

require('../../server/plugins/smartdiet/functions')

const {getDatabaseUri} = require('../../config/config')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const CoachingLogbook = require('../../server/models/CoachingLogbook')

jest.setTimeout(2000000)

describe('Logbbooks management ', () => {

  let user
  let logbook, logbook2

  beforeAll(async() => {
    await mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
    await CoachingLogbook.remove()
  })

  afterAll(async() => {
    await mongoose.connection.close()
  })

  it('must not create extra coaching logbooks', async() => {
    const count=await CoachingLogbook.count()
    expect(count).toBe(0)
    console.time('consistency')
    await logbooksConsistency()
    console.timeEnd('consistency')
    const afterCount=await CoachingLogbook.count()
    console.log('after', afterCount)
    expect(afterCount).toBeGreaterThan(0)
    for (const idx of lodash.range(12)) {
      console.time('consistency')
      await logbooksConsistency()
      console.timeEnd('consistency')
      console.log(idx)
      const testCount=await CoachingLogbook.count()
      expect(testCount).toBe(afterCount)
    }
  })

})
