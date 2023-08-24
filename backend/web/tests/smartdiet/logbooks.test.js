const {
  logbooksConsistency
} = require('../../server/plugins/smartdiet/functions')
const {
  QUIZZ_QUESTION_TYPE,
  QUIZZ_TYPE_LOGBOOK
} = require('../../server/plugins/smartdiet/consts')
const QuizzQuestion = require('../../server/models/QuizzQuestion')
const Quizz = require('../../server/models/Quizz')
const moment=require('moment')
const mongoose = require('mongoose')

const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')

forceDataModelSmartdiet()

require('../../server/plugins/smartdiet/functions')

const {getDataModel} = require('../../config/config')
const {MONGOOSE_OPTIONS, loadFromDb} = require('../../server/utils/database')
const {ROLE_CUSTOMER, COMPANY_ACTIVITY} = require('../../server/plugins/smartdiet/consts')

const Appointment=require('../../server/models/Appointment')
const Coaching=require('../../server/models/Coaching')
const User=require('../../server/models/User')
const Company=require('../../server/models/Company')
require('../../server/models/Target')
require('../../server/models/Quizz')
require('../../server/models/Association')
require('../../server/models/Key')
require('../../server/models/Category')
require('../../server/models/Question')
require('../../server/models/UserQuizz')
require('../../server/models/Item')
require('../../server/models/FoodDocument')
require('../../server/models/Availability')
require('../../server/models/Range')
require('../../server/models/LogbookDay')

jest.setTimeout(10000)

describe('Logbbooks management ', () => {

  let user
  let logbook, logbook2

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    const company=await Company.create({name: 'Company', size:100, activity: Object.keys(COMPANY_ACTIVITY)[0]})
    user=await User.create({company, dataTreatmentAccepted:true,role:ROLE_CUSTOMER, cguAccepted:true,
      pseudo: 'Seb', firstname: 'S', lastname: 'S', email: 'a@a.com'})
    const question=await QuizzQuestion.create({title: 'Question booléenne', type: Object.keys(QUIZZ_QUESTION_TYPE)[0]})
    logbook=await Quizz.create({name: 'test 1', type: QUIZZ_TYPE_LOGBOOK, questions:[question._id]})
    logbook2=await Quizz.create({name: 'test 2', type: QUIZZ_TYPE_LOGBOOK, questions:[question._id]})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must return instantiated logbboks', async() => {
    const coaching=await Coaching.create({user})
    const created_app=await Appointment.create({coaching:coaching._id, start_date: moment().add(-2, 'day'), end_date: moment().add(-2, 'day').add(2, 'hour'), logbooks:[logbook._id]})
    const created_app_2=await Appointment.create({coaching:coaching._id, start_date: moment().add(-4, 'day'), end_date: moment().add(-4, 'day').add(2, 'hour'), logbooks:[logbook._id, logbook2._id]})
    const apps=await loadFromDb({model: 'appointment', fields:['logbooks']})
    expect(apps[0].logbooks).toHaveLength(1)
    expect(apps[1].logbooks).toHaveLength(2)
    const res=await logbooksConsistency()
    console.log(JSON.stringify(res, null, 2))
    const [loaded_user]=await loadFromDb({model: 'user', fields:['latest_coachings']})
    const logbookDays=loaded_user.latest_coachings[0].logbooks
    console.log(`logbooks days:${JSON.stringify(logbookDays, null, 2)}`)
  })

})
