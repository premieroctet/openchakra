const {generateGraph} = require('../../../scripts/generateGraph')
const mongoose=require('mongoose')
const moment=require('moment')
const {MONGOOSE_OPTIONS} = require('../../../server/utils/database')
const { schemaOptions } = require('../../../server/utils/schemas')

const Schema = mongoose.Schema;

describe('Grap test', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  test('Generate dot format', async () => {
    return generateGraph()
      .then(res => console.log(res))
  })

})
