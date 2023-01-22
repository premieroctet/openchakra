const moment=require('moment')
const {forceDataModelAftralStudio}=require('../utils')
forceDataModelAftralStudio()

const mongoose = require('mongoose')
const {STATUS} = require('../../utils/aftral_studio/consts')
const {MONGOOSE_OPTIONS, getModels} = require('../../server/utils/database')
require('../../server/utils/studio/aftral_studio/functions')
require('../../server/models/Resource')
require('../../server/models/Theme')
require('../../server/models/TrainingCenter')

describe('Schema virtual enum attributes', () => {

  beforeAll(async () => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    await mongoose.connection.dropDatabase()
  })

  test('Should return theme status enumValues', async() => {
    const models=await getModels()
    const themeAttributes=models.theme.attributes
    expect(themeAttributes.status.enumValues).toEqual(STATUS)
    const resourcesAttributes=models.resource.attributes
    return expect(resourcesAttributes.status.enumValues).toEqual(STATUS)
  })

})
