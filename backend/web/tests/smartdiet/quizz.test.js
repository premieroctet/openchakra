const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')
forceDataModelSmartdiet()

require('../../server/models/User')
const {USER_DATA, COMPANY_DATA, COACHING_DATA} = require('./data/modelsBaseData')
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
  let quizz=null

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
    quizz=await Quizz.create({type:QUIZZ_TYPE_PATIENT, name:'Mon quizz', questions})
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must create user quizz for template quizz on coaching', async() => {
    await putToDb({model: 'coaching', id: coaching.id, params: {quizz: [quizz._id]}})
    const [coaching2]=await loadFromDb({model: 'coaching', id:coaching._id, fields:['quizz', 'user_quizz']})
    console.log(JSON.stringify(coaching2.quizz))
    expect(coaching2.quizz).toHaveLength(1)
    expect(coaching2.user_quizz).toHaveLength(1)
    return expect(coaching2.quizz[0]._id).toEqual(coaching2.user_quizz[0].coaching._id.toString())
  })

})
