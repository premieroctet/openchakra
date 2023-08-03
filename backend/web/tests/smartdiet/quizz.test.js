const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')
forceDataModelSmartdiet()

require('../../server/models/User')
const {USER_DATA, COMPANY_DATA, COACHING_DATA, APPOINTMENT_DATA} = require('./data/modelsBaseData')
const {ROLE_CUSTOMER, ROLE_EXTERNAL_DIET, QUIZZ_TYPE_PATIENT, QUIZZ_QUESTION_TYPE} = require('../../server/plugins/smartdiet/consts')

const moment=require('moment')
const mongoose = require('mongoose')
const lodash = require('lodash')
const {MONGOOSE_OPTIONS, loadFromDb, putToDb} = require('../../server/utils/database')

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

jest.setTimeout(10000)

describe('Survey ', () => {

  let coaching=null
  let quizzs=null
  let appointment=null

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
    appointment=await Appointment.create({...APPOINTMENT_DATA, coaching})
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must create user quizz for template quizz on coaching', async() => {
    await putToDb({model: 'coaching', id: coaching.id, params: {quizz: quizzs}})
    const [coaching2]=await loadFromDb({model: 'coaching', id:coaching._id, fields:['quizz', 'user_quizz.quizz']})
    expect(coaching2.quizz).toHaveLength(quizzs.length)
    expect(coaching2.user_quizz).toHaveLength(coaching2.quizz.length)
    expect(coaching2.quizz.map(q => q._id)).toEqual(coaching2.user_quizz.map(q => q.quizz._id))
    await putToDb({model: 'coaching', id: coaching.id, params: {quizz: quizzs.slice(0, 2)}})
    const [coaching3]=await loadFromDb({model: 'coaching', id:coaching._id, fields:['quizz', 'user_quizz.quizz']})
    expect(coaching3.quizz).toHaveLength(2)
    expect(coaching3.user_quizz).toHaveLength(coaching3.quizz.length)
    return expect(coaching3.quizz.map(q => q._id)).toEqual(coaching3.user_quizz.map(q => q.quizz._id))
  })

  it('must create user logbooks for template logbooks on appointment', async() => {
    await putToDb({model: 'appointment', id: appointment.id, params: {logbooks: quizzs}})
    const [app2]=await loadFromDb({model: 'appointment', id:appointment._id, fields:['logbooks', 'user_logbooks.quizz']})
    expect(app2.logbooks).toHaveLength(quizzs.length)
    expect(app2.user_logbooks).toHaveLength(app2.logbooks.length)
    expect(app2.logbooks.map(q => q._id)).toEqual(app2.user_logbooks.map(q => q.quizz._id))
    await putToDb({model: 'appointment', id: appointment.id, params: {logbooks: quizzs.slice(0, 2)}})
    const [app3]=await loadFromDb({model: 'appointment', id:appointment._id, fields:['logbooks', 'user_logbooks.quizz']})
    expect(app3.logbooks).toHaveLength(2)
    expect(app3.user_logbooks).toHaveLength(app3.logbooks.length)
    return expect(app3.logbooks.map(q => q._id)).toEqual(app3.user_logbooks.map(q => q.quizz._id))
  })

})
