const AppointmentType = require('../../server/models/AppointmentType')
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
require('../../server/models/LogbookDay')

jest.setTimeout(10000)

describe('Survey ', () => {

  let user;

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    const company=await Company.create({name: 'Company', size:100, activity: Object.keys(COMPANY_ACTIVITY)[0]})
    user=await User.create({company, dataTreatmentAccepted:true,role:ROLE_CUSTOMER, cguAccepted:true,
      pseudo: 'Seb', firstname: 'S', lastname: 'S', email: 'a@a.com'})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must return appointment.index', async() => {
    const appt=await AppointmentType.create({smartagenda_id:5, duration:60, title: 'App type test'})
    const coaching=await Coaching.create({user})
    const app1=await Appointment.create({coaching, start_date: moment(), end_date: moment().add(10, 'minutes'), appointment_type: appt._id})
    const app2=await Appointment.create({coaching, start_date: moment(), end_date: moment().add(10, 'minutes'), appointment_type: appt._id})
    const appRead1=await loadFromDb({model: 'appointment', id:app1._id, fields:['start_date', 'order']})
    const appRead2=await loadFromDb({model: 'appointment', id:app2._id, fields:['start_date', 'order']})
    expect(appRead1[0].order).toEqual(1)
    expect(appRead2[0].order).toEqual(2)
  })

})
