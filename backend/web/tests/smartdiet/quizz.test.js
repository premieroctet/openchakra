const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')
forceDataModelSmartdiet()

require('../../server/models/User')
const {USER_DATA, COMPANY_DATA, COACHING_DATA, APPOINTMENT_DATA} = require('./data/modelsBaseData')
const {ROLE_CUSTOMER, ROLE_EXTERNAL_DIET, QUIZZ_TYPE_PATIENT, QUIZZ_QUESTION_TYPE} = require('../../server/plugins/smartdiet/consts')

const moment=require('moment')
const mongoose = require('mongoose')
const lodash = require('lodash')
const {MONGOOSE_OPTIONS, loadFromDb, putAttribute} = require('../../server/utils/database')

const User=require('../../server/models/User')
const Company=require('../../server/models/Company')
const Coaching=require('../../server/models/Coaching')
const QuizzQuestion=require('../../server/models/QuizzQuestion')
const Quizz=require('../../server/models/Quizz')
const Appointment=require('../../server/models/Appointment')
require('../../server/models/Target')
require('../../server/models/Category')
require('../../server/models/Association')
require('../../server/models/Key')
require('../../server/models/Question')
require('../../server/models/UserQuizz')
require('../../server/models/Quizz')

describe('Quizz', () => {

  let coaching=null
  let quizzs=null

  beforeAll(async () => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    require('../../server/plugins/smartdiet/functions')
    const company=await Company.create(COMPANY_DATA)
    const customer=await User.create({...USER_DATA, email: 'customer@test.com', role: ROLE_CUSTOMER, company})
    const diet=await User.create({...USER_DATA, email: 'external_diet@test.com',role: ROLE_EXTERNAL_DIET, company})
    coaching=await Coaching.create({...COACHING_DATA, user:customer, diet})
    const questions=await Promise.all(lodash.range(5).map(i => QuizzQuestion.create({
      title:`Question ${i+1}`, type:Object.keys(QUIZZ_QUESTION_TYPE)[0]
    })))
    quizzs=await Promise.all(lodash.range(3).map(idx => Quizz.create({type:QUIZZ_TYPE_PATIENT, name:`Quizz ${idx}`, questions})))
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must create user logbook for template logbook on coaching', async() => {
    await putAttribute(({id:coaching.id, attribute:'logbook_templates', value:[quizzs[0]._id]}))
    let newCoaching=(await loadFromDb({model: 'coaching', id: coaching._id, fields: ['logbook_templates', 'logbooks.quizz']}))[0]
    expect(newCoaching.logbook_templates).toHaveLength(1)
    expect(newCoaching.logbooks).toHaveLength(1)
    expect(newCoaching.logbooks[0].quizz._id).toEqual(newCoaching.logbook_templates[0]._id)
    await putAttribute(({id:coaching.id, attribute:'logbook_templates', value:[]}))
    newCoaching=(await loadFromDb({model: 'coaching', id: coaching._id, fields: ['logbook_templates', 'logbooks']}))[0]
    expect(newCoaching.logbook_templates).toHaveLength(0)
    expect(newCoaching.logbooks).toHaveLength(0)
  })

  it('must create user quizz for template quizz on coaching', async() => {
    await putAttribute(({id:coaching.id, attribute:'quizz_templates', value:[quizzs[0]._id]}))
    let newCoaching=(await loadFromDb({model: 'coaching', id: coaching._id, fields: ['quizz_templates', 'quizz.quizz']}))[0]
    expect(newCoaching.quizz_templates).toHaveLength(1)
    expect(newCoaching.quizz).toHaveLength(1)
    expect(newCoaching.quizz[0].quizz._id).toEqual(newCoaching.quizz_templates[0]._id)
    await putAttribute(({id:coaching.id, attribute:'quizz_templates', value:[]}))
    newCoaching=(await loadFromDb({model: 'coaching', id: coaching._id, fields: ['quizz_templates', 'quizz']}))[0]
    expect(newCoaching.quizz_templates).toHaveLength(0)
    expect(newCoaching.quizz).toHaveLength(0)
  })

})
