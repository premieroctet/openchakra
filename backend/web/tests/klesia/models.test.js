const moment=require('moment')
const mongoose = require('mongoose')
const { forceDataModelKlesia } = require('../utils')
forceDataModelKlesia()
require('../../server/plugins/klesia/functions')
const { MONGOOSE_OPTIONS, getModels } = require('../../server/utils/database')
require('../../server/models/User')
require('../../server/models/OrderedArticles')
require('../../server/models/Article')
require('../../server/models/Tip')
require('../../server/models/Module')
require('../../server/models/BestPractices')
require('../../server/models/Quizz')
require('../../server/models/Emergency')

describe('Test DB', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must display models', async() => {
    const models=await getModels()
    console.log(Object.keys(models))
  })

})
