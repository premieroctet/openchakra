const mongoose = require('mongoose')
const moment=require('moment')
const {forceDataModelAftralStudio}=require('../utils')
forceDataModelAftralStudio()
const {
  getResourceAnnotation,
  setResourceAnnotation,
} = require('../../server/utils/studio/aftral_studio/functions')
const UserSessionData = require('../../server/models/UserSessionData')
const Resource = require('../../server/models/Resource')
const {APPRENANT} = require('../../utils/aftral_studio/consts')
const User = require('../../server/models/User')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

jest.setTimeout(20000)

describe('ResourceAnnotation', () => {

  let user, resource
  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    await mongoose.connection.dropDatabase()
    user=await User.create({firstname: 'Sébastien', name: 'Auvray', email: 'email@test.com', role: APPRENANT})
    resource=await Resource.create({name: 'resource test'})
  })

  test('Should autopopulate multiple levels', async() => {
    const ANNOTATION1='Petite annotation'
    const ANNOTATION2='Grosse annotation'
    await setResourceAnnotation({user, model: 'resource', parent: resource._id,
      attribute: 'annotation', value: ANNOTATION1})
    await setResourceAnnotation({user, model: 'resource', parent: resource._id,
      attribute: 'annotation', value: ANNOTATION2})
    // Test saved
    const userData=await UserSessionData.findOne()
    expect(userData).toBeTruthy()
    const anno=await getResourceAnnotation(user, {}, resource)
    return expect(anno).toEqual(ANNOTATION2)
  })

})
