const {STATUS} = require('../utils/aftral_studio/consts')
const {MONGOOSE_OPTIONS, getModels} = require('../server/utils/database')
const {getDatabaseUri} = require('../config/config')
require('../server/models/Resource')
require('../server/models/Theme')
const mongoose = require('mongoose')

describe('Schema virtual enum attributes', () => {

  beforeAll(() => {
    return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  })

  test('Should return theme status enumValues', async() => {
    const models=await getModels()
    const themeAttributes=models.find(m => m.name=='theme').attributes
    expect(themeAttributes.status.enumValues).toEqual([null, ...Object.keys(STATUS)])
    const resourcesAttributes=models.find(m => m.name=='resource').attributes
    return expect(resourcesAttributes.status.enumValues).toEqual([null, ...Object.keys(STATUS)])
  })

})
