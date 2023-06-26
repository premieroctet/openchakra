const { checkConsistency } = require('../../../scripts/database/consistency')
const mongoose = require('mongoose')
const moment=require('moment')

describe('Test DB consistency on missing references', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it('should check for missing references', async() => {
    await checkConsistency()
  })


})
