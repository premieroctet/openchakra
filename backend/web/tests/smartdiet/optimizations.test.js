const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')
forceDataModelSmartdiet()

require('../../server/plugins/smartdiet/functions')

const moment=require('moment')
const mongoose = require('mongoose')
const lodash = require('lodash')
const {MONGOOSE_OPTIONS, loadFromDb, getModels} = require('../../server/utils/database')
const {getDatabaseUri}=require('../../config/config')

require('../../server/models/adminDashboard')
require('../../server/models/association')
require('../../server/models/category')
require('../../server/models/challengePip')
require('../../server/models/challengeUserPip')
require('../../server/models/chartPoint')
require('../../server/models/coaching')
require('../../server/models/coachingQuestion')
require('../../server/models/CollectiveChallenge')
require('../../server/models/comment')
require('../../server/models/company')
require('../../server/models/consultation')
require('../../server/models/content')
require('../../server/models/event')
require('../../server/models/gift')
require('../../server/models/group')
require('../../server/models/individualChallenge')
require('../../server/models/ingredient')
require('../../server/models/instrument')
require('../../server/models/key')
require('../../server/models/measure')
require('../../server/models/menu')
require('../../server/models/menuRecipe')
require('../../server/models/message')
require('../../server/models/offer')
require('../../server/models/partnerApplication')
require('../../server/models/pip')
require('../../server/models/question')
require('../../server/models/recipe')
require('../../server/models/recipeIngredient')
require('../../server/models/spoonGain')
require('../../server/models/target')
require('../../server/models/team')
require('../../server/models/teamMember')
require('../../server/models/user')
require('../../server/models/userCoachingQuestion')
require('../../server/models/userQuestion')
require('../../server/models/userSurvey')
require('../../server/models/webinar')

jest.setTimeout(20000)

describe('Test models ', () => {

  beforeAll(() => {
    return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  })

  it('Must not load extra attributes', () => {
    return loadFromDb({model: 'adminDashboard'})
      .then(res => expect(res).toEqual([{average_webinar_registar: 0.75, groups_count: 12, webinars_count: 12, webinars_replayed_count: 0}]))
  })

  it.only('Must return required fields' , () => {
    const models=getModels()
    const attributes=lodash(models).values()
    attributes.forEach(model => {
      lodash(model.attributes).entries().forEach(([key, params]) => {
        //console.log(`Test de ${model.name}.${key}.required`)
        expect(params).toHaveProperty('required')
      })
    })
    console.log(JSON.stringify(attributes.value(),null,2))
  })

})
