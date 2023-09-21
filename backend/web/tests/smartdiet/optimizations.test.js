const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')
forceDataModelSmartdiet()

require('../../server/plugins/smartdiet/functions')

const moment=require('moment')
const mongoose = require('mongoose')
const lodash = require('lodash')
const {MONGOOSE_OPTIONS, loadFromDb, getModels} = require('../../server/utils/database')

require('../../server/models/AdminDashboard')
require('../../server/models/Association')
require('../../server/models/Category')
require('../../server/models/ChallengePip')
require('../../server/models/ChallengeUserPip')
require('../../server/models/ChartPoint')
require('../../server/models/Coaching')
require('../../server/models/CoachingQuestion')
require('../../server/models/CollectiveChallenge')
require('../../server/models/Comment')
require('../../server/models/Company')
require('../../server/models/Consultation')
require('../../server/models/Content')
require('../../server/models/Event')
require('../../server/models/Gift')
require('../../server/models/Group')
require('../../server/models/IndividualChallenge')
require('../../server/models/Ingredient')
require('../../server/models/Instrument')
require('../../server/models/Key')
require('../../server/models/Measure')
require('../../server/models/Menu')
require('../../server/models/MenuRecipe')
require('../../server/models/Message')
require('../../server/models/Offer')
require('../../server/models/PartnerApplication')
require('../../server/models/Pip')
require('../../server/models/Question')
require('../../server/models/Recipe')
require('../../server/models/RecipeIngredient')
require('../../server/models/SpoonGain')
require('../../server/models/Target')
require('../../server/models/Team')
require('../../server/models/TeamMember')
require('../../server/models/User')
require('../../server/models/UserCoachingQuestion')
require('../../server/models/UserQuestion')
require('../../server/models/UserSurvey')
require('../../server/models/Webinar')
require('../../server/models/UserQuizz')
require('../../server/models/Quizz')

jest.setTimeout(20000)

describe('Test models ', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
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
        expect(params).toHaveProperty('required')
      })
    })
  })

})
