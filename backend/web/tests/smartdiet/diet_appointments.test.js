const moment=require('moment')
const mongoose = require('mongoose')

const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')
forceDataModelSmartdiet()
require('../../server/plugins/smartdiet/functions')

const {getDataModel} = require('../../config/config')
const {MONGOOSE_OPTIONS, loadFromDb} = require('../../server/utils/database')
const {ROLE_CUSTOMER, COMPANY_ACTIVITY,QUIZZ_QUESTION_TYPE,QUIZZ_TYPE_LOGBOOK,ROLE_EXTERNAL_DIET} = require('../../server/plugins/smartdiet/consts')

const Coaching=require('../../server/models/Coaching')
const User=require('../../server/models/User')
const Company=require('../../server/models/Company')
const Appointment=require('../../server/models/Appointment')
require('../../server/models/LogbookDay')
require('../../server/models/Range')
require('../../server/models/Target')
require('../../server/models/Category')
require('../../server/models/UserQuizz')
require('../../server/models/Quizz')
require('../../server/models/Key')
require('../../server/models/Association')
require('../../server/models/Question')
require('../../server/models/Item')
jest.setTimeout(10000)

describe('Diet appointments management ', () => {

  let user
  let diet

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    const company=await Company.create({name: 'Company', size:100, activity: Object.keys(COMPANY_ACTIVITY)[0]})
    user=await User.create({company, dataTreatmentAccepted:true,role:ROLE_CUSTOMER, cguAccepted:true,
      pseudo: 'Seb', firstname: 'S', lastname: 'S', email: 'a@a.com'})
    diet=await User.create({role:ROLE_EXTERNAL_DIET, pseudo: 'Diet', firstname: 'Diet', lastname: 'Diet', email: 'diet@diet.com'})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must return diet appointments', async() => {
    const coaching=await Coaching.create({diet:diet._id, user:user._id})
    const created_app=await Appointment.create({coaching:coaching._id, start_date: moment().add(-2, 'day'), end_date: moment().add(-2, 'day').add(2, 'hour')})
    const created_app_2=await Appointment.create({coaching:coaching._id, start_date: moment().add(-4, 'day'), end_date: moment().add(-4, 'day').add(2, 'hour')})
    const users=await loadFromDb({model: 'user', fields:['diet_appointments']})
    const loaded_diet=users.find(u => u.role==ROLE_EXTERNAL_DIET)
    console.log(`Diet appointments:${loaded_diet.role}:${loaded_diet.diet_appointments}`)
  })

})
