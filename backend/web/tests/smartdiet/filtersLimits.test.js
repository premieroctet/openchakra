const { extractFilters, getCurrentFilter, getSubFilters, extractLimits, getSubLimits } = require('../../server/utils/database')
const { forceDataModelSmartdiet } = require('../utils')
forceDataModelSmartdiet()
require('../../server/models/User')
require('../../server/models/Event')

describe('SmartAgenda test ', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  const PARAMS={'filter.name': 'hop', 'filter.passed_events.name': 'tagada', 'limit': 30, 'limit.passed_events': 500}

  it('must handle filters', async() => {
    const filters=extractFilters(PARAMS)
    expect(filters).toEqual({name: /hop/i, 'passed_events.name': /tagada/i})
    const currentFilter=getCurrentFilter(filters, 'user')
    expect(currentFilter).toEqual({name: /hop/i})
    const subFilters=getSubFilters(filters, 'passed_events')
    expect(subFilters).toEqual({name: /tagada/i})
  })

  it('must handle limits', async() => {
    const limits=extractLimits(PARAMS)
    const limit=limits['']
    expect(limit).toEqual(30)
    const subLimits=getSubLimits(limits, 'passed_events')
    expect(subLimits['']).toEqual(500)
  })

})
