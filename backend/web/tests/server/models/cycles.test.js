const moment = require('moment')

const checkCycle=require('../../../server/validation/cycle')

describe('Cycle detection', () => {

  test('Check cycle', async () => {
    const IDS_1={1: [2,3], 2: [3], 3: [1]}
    expect(checkCycle(Object.keys(IDS_1), id => IDS_1[id])).toEqual([2,3,1])
    const IDS_2={1: [2], 2: [3], 3: [4]}
    expect(checkCycle(Object.keys(IDS_2), id => IDS_2[id])).toEqual(null)
  })

})
