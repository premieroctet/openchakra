const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAftral}=require('../utils')
forceDataModelAftral()
require('../../server/plugins/aftral/functions')
const {STATUS} = require('../../server/plugins/aftral/consts')
const {MONGOOSE_OPTIONS, getModels} = require('../../server/utils/database')
require('../../server/models/Resource')
require('../../server/models/Theme')
require('../../server/models/TrainingCenter')

describe('Schema virtual enum attributes', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  test('Should return theme status enumValues', async() => {
    const models=await getModels()
    const themeAttributes=models.theme.attributes
    expect(themeAttributes.status.enumValues).toEqual(STATUS)
    const resourcesAttributes=models.resource.attributes
    return expect(resourcesAttributes.status.enumValues).toEqual(STATUS)
  })

})
