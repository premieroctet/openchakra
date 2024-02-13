const lodash=require('lodash')
const AppointmentType = require('../../server/models/AppointmentType')
const moment=require('moment')
const mongoose = require('mongoose')
const { performance } = require('perf_hooks');
const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')

forceDataModelSmartdiet()

require('../../server/plugins/smartdiet/functions')

const {getDataModel} = require('../../config/config')
const {MONGOOSE_OPTIONS, loadFromDb, buildPopulates, getModel, getModels, getFieldsToCompute} = require('../../server/utils/database')
const {ROLE_CUSTOMER, COMPANY_ACTIVITY, ROLE_EXTERNAL_DIET, ROLE_SUPER_ADMIN} = require('../../server/plugins/smartdiet/consts')

const Appointment=require('../../server/models/Appointment')
const Coaching=require('../../server/models/Coaching')
const User=require('../../server/models/User')
const Company=require('../../server/models/Company')
const { computeStatistics } = require('../../server/plugins/smartdiet/functions');
const Patient = require('../../server/models/Patient');
require('../../server/models/Answer')
require('../../server/models/ResetToken')
require('../../server/models/Program')
require('../../server/models/Theme')
require('../../server/models/Resource')
require('../../server/models/Session')
require('../../server/models/TrainingCenter')
require('../../server/models/User')
require('../../server/models/Contact')
require('../../server/models/Message')
require('../../server/models/LoggedUser')
require('../../server/models/Post')
require('../../server/models/Event')
require('../../server/models/Company')
require('../../server/models/Drink')
require('../../server/models/Meal')
require('../../server/models/Cigar')
require('../../server/models/OrderItem')
require('../../server/models/Booking')
require('../../server/models/Guest')
require('../../server/models/CigarCategory')
require('../../server/models/DrinkCategory')
require('../../server/models/MealCategory')
require('../../server/models/Conversation')
require('../../server/models/Measure')
require('../../server/models/Reminder')
require('../../server/models/Appointment')
require('../../server/models/Payment')
require('../../server/models/Accessory')
require('../../server/models/AccessoryCategory')
require('../../server/models/Review')
require('../../server/models/Offer')
require('../../server/models/Content')
require('../../server/models/Key')
require('../../server/models/Group')
require('../../server/models/Target')
require('../../server/models/PartnerApplication')
require('../../server/models/Spoon')
require('../../server/models/CollectiveChallenge')
require('../../server/models/Gift')
require('../../server/models/SpoonGain')
require('../../server/models/Menu')
require('../../server/models/Webinar')
require('../../server/models/IndividualChallenge')
require('../../server/models/JobUser')
require('../../server/models/Comment')
require('../../server/models/Recommandation')
require('../../server/models/Quotation')
require('../../server/models/Skill')
require('../../server/models/Activity')
require('../../server/models/Experience')
require('../../server/models/Request')
require('../../server/models/Pip')
require('../../server/models/Diploma')
require('../../server/models/Photo')
require('../../server/models/Mission')
require('../../server/models/QuotationDetail')
require('../../server/models/Recipe')
require('../../server/models/Instrument')
require('../../server/models/Ingredient')
require('../../server/models/RecipeIngredient')
require('../../server/models/AdminDashboard')
require('../../server/models/Question')
require('../../server/models/UserQuestion')
require('../../server/models/UserSurvey')
require('../../server/models/MenuRecipe')
require('../../server/models/Team')
require('../../server/models/Association')
require('../../server/models/ChartPoint')
require('../../server/models/TeamMember')
require('../../server/models/ChallengePip')
require('../../server/models/Coaching')
require('../../server/models/Consultation')
require('../../server/models/CoachingQuestion')
require('../../server/models/UserCoachingQuestion')
require('../../server/models/Network')
require('../../server/models/DietComment')
require('../../server/models/FoodDocument')
require('../../server/models/Quizz')
require('../../server/models/QuizzQuestion')
require('../../server/models/UserQuizz')
require('../../server/models/UserQuizzQuestion')
require('../../server/models/Item')
require('../../server/models/Range')
require('../../server/models/Availability')
require('../../server/models/LogbookDay')
require('../../server/models/CoachingLogbook')
require('../../server/models/Lead')
require('../../server/models/AppointmentType')
require('../../server/models/GraphData')
require('../../server/models/Issue')
require('../../server/models/Project')
require('../../server/models/UserProject')
require('../../server/models/Module')
require('../../server/models/Article')
require('../../server/models/BestPractices')
require('../../server/models/Tip')
require('../../server/models/Emergency')
require('../../server/models/Step')
require('../../server/models/DeclineReason')
require('../../server/models/Interest')
require('../../server/models/Job')
require('../../server/models/NutritionAdvice')
require('../../server/models/JoinReason')
require('../../server/models/Patient')

const FIELDS=`groups_count,messages_count,users_count,user_women_count,webinars_count,webinars_replayed_count,average_webinar_registar,company,started_coachings,users_men_count,users_no_gender_count,leads_count`.split(',')
const COMPANY_CRITERION = {name: /etude clinique/i}
const DIET_CRITERION={email: 'stephanieb.smartdiet@gmail.com', role: ROLE_EXTERNAL_DIET}
const USER_CRITERION={email: 'hello+user@wappizy.com', role: ROLE_CUSTOMER}

describe('Performance ', () => {

  let diet
  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/smartdiet`, MONGOOSE_OPTIONS)
    diet=await User.findOne(DIET_CRITERION)
  })

  afterAll(async() => {
    // await mongoose.connection.close()
  })

  it(`must load statistics 'fastly'`, async() => {
    const company=await Company.findOne(COMPANY_CRITERION)
    const stats=await computeStatistics({id: company._id, fields: FIELDS})
    expect(stats).toBeTruthy()
  }, 1000)

  it(`must load statistics properly`, async() => {
    const company=await Company.findOne(COMPANY_CRITERION)
    const stats=await computeStatistics({id: company._id, fields: FIELDS})
    FIELDS.forEach(f => expect(stats).not.toBeNull())
    FIELDS.forEach(f => expect(stats[f]).not.toBeUndefined())
  }, 1000)

  it('must return diet patients', async () => {
    const dietUser=await User.findOne(DIET_CRITERION)
    const [loaded]=await loadFromDb({model: 'user', id: dietUser._id, fields:['diet_patients_count'], user: dietUser})
    expect(loaded.diet_patients_count).toBeGreaterThan(0)
  }, 2000)

  it('must return diet appointments', async () => {
    const dietUser=await User.findOne(DIET_CRITERION)
    const appts=await loadFromDb({model: 'appointment', id: dietUser._id, fields: ['start_date'], user: dietUser})
    expect(appts.length).toBeGreaterThan(0)
  }, 2000)

  it('must load limits', async () => {
    const LIMIT=200
    const user=await User.findOne({role: ROLE_EXTERNAL_DIET})
    const users=await loadFromDb({model: 'user', fields:['firstname'], params:{limit:LIMIT}, user})
    return expect(users.length).toEqual(LIMIT+1)
  })

  it('must speed up patients loading', async () => {
    const user=await User.findOne(DIET_CRITERION)
    // console.time('loading diet_patients')
    // const [loggedUser]=await loadFromDb({model: 'loggedUser', fields:['diet_patients.fullname'], user})
    // console.timeEnd('loading diet_patients')
    // expect(loggedUser.diet_patients.length).toEqual(1189)
    console.time('loading diet patients')
    const userIds=await Coaching.distinct('user', {diet: user._id})
    const patients=await loadFromDb({model: ROLE_CUSTOMER, fields: ['fullname'], params: {'filter._id': {$in: userIds}, 'filter.firstname': 'hop'}, user})
    console.timeEnd('loading diet patients')
    console.log('patient', patients.length)
    // expect(patients.length).toEqual(1189)
  }, 16000)
  
  it('must speed up diet appointments loading', async () => {
    const user=await User.findOne(DIET_CRITERION)
    const fields=`diet_appointments_count,diet_current_future_appointments.coaching.user.picture,diet_current_future_appointments.coaching.user.fullname,diet_current_future_appointments.coaching.user.company_name,diet_current_future_appointments.start_date,diet_current_future_appointments.end_date,diet_current_future_appointments.order,diet_current_future_appointments.appointment_type.title,diet_current_future_appointments.status,diet_current_future_appointments.visio_url,diet_current_future_appointments.coaching.user,diet_current_future_appointments,diet_current_future_appointments.coaching.user.phone`.split(',')
    const params={'limit':5000}
    console.time('Loading current & future appointments')
    const [loggedUser]=await loadFromDb({model: 'loggedUser', fields, params, user})
    console.timeEnd('Loading current & future appointments')
    expect(loggedUser.diet_appointments_count).toEqual(28)
    console.log(loggedUser.diet_current_future_appointments?.length)
  }, 3000)

  it('must speed up diet patients and appointments loading', async () => {
    const user=await User.findOne(DIET_CRITERION)
    const fields=`diet_patients,diet_patients.fullname,diet_patients.picture,diet_patients.company.name,firstname,picture,diet_appointments_count,diet_patients_count,diet_current_future_appointments.coaching.user.picture,diet_current_future_appointments.coaching.user.fullname,diet_current_future_appointments.coaching.user.company_name,diet_current_future_appointments.start_date,diet_current_future_appointments.end_date,diet_current_future_appointments.order,diet_current_future_appointments.appointment_type.title,diet_current_future_appointments.status,diet_current_future_appointments.visio_url,diet_current_future_appointments.coaching.user,diet_current_future_appointments,diet_current_future_appointments.coaching.user.phone`.split(',')
    const params={'limit.diet_patients': '4', 'limit':30, 'limit.diet_current_future_appointments':'30'}
    const loggedUser=await loadFromDb({model: 'loggedUser', fields, params, user})
  }, 2000)

  it('must load appointments order', async () => {
    const user=await User.findOne(DIET_CRITERION)
    const fields=`diet_appointments.order,diet_appointments.start_date`.split(',')
    const [loadedUser]=await loadFromDb({
      model: 'loggedUser', 
      fields, 
      user, 
      params:{"limit.diet_appointments":"1","limit":"30"}})
    expect(loadedUser.diet_appointments[0].order).toBeGreaterThan(0)
  }, 3000)

  it('must load survey progress', async () => {
    const user=await User.findOne({email: /hello\+user@/})
    const fields=`name,user_surveys_progress,user_surveys_progress.value_1,picture`.split(',')
    const keys= await loadFromDb({model: 'key', fields, user})
    keys.every(k => expect(k.user_surveys_progress).toHaveLength(6))
  })

  it('must load user contents', async () => {
    const user=await User.findOne(USER_CRITERION)
    const fields=`contents,email`.split(',')
    const [loggedUser]= await loadFromDb({model: 'user', id:user._id, fields, user})
    expect(loggedUser.contents?.length).toBeGreaterThan(0)
  })

  it('must load all users fullname', async () => {
    const user=await User.findOne({email: /hello\+user@/})
    const fields=`fullname,company.name`.split(',')
    console.time('Loading users')
    const users= await loadFromDb({model: 'user', fields, user, params:{limit:1000}})
    console.timeEnd('Loading users')
    console.log(users.length)
    expect(users.length).toBeGreaterThan(0)
  })

  it('must load user logbooks', async () => {
    const {id:userid}=await User.findOne({email: /hello\+user@/})
    const fields=`latest_coachings.logbooks.logbooks.day`.split(',')
    console.time('Loading users')
    const [user] = await loadFromDb({model: 'user', fields, id: userid, user, params:{limit:1000}})
    console.timeEnd('Loading users')
    console.log(user.latest_coachings)
    expect(user.length).toBeGreaterThan(0)
  })

  it('must load menus', async () => {
    const user=await User.findOne({email: /hello\+user@/})
    const fields=`individual_challenges.name,individual_challenges.description,collective_challenges.start_date,collective_challenges.end_date,collective_challenges.name,collective_challenges.picture,picture,past_webinars,passed_individual_challenges.trophy_on_picture,passed_individual_challenges.name,passed_individual_challenges,collective_challenges,past_webinars.picture,past_webinars.name,past_webinars.url,individual_challenges.key.picture,individual_challenges,available_menus.picture,available_menus.name,available_menus.start_date,available_menus.end_date,available_menus,past_menus,future_menus,individual_challenges.trick,passed_individual_challenges.description,past_webinars.duration,available_menus.document,passed_events,future_menus.picture,future_menus.name,future_menus.start_date,future_menus.end_date,future_menus.document,past_menus.picture,past_menus.name,past_menus.start_date,past_menus.end_date,past_menus.document,available_webinars,available_webinars.key.picture,available_webinars.picture,available_webinars.start_date,available_webinars.end_date,available_webinars.duration,available_webinars.name,available_webinars.description,individual_challenges.status,individual_challenges.hardness,passed_events.key.picture,passed_events.picture,passed_events.start_date,passed_events.end_date,passed_events.duration,passed_events.name,passed_events.description,passed_events.type`.split(',')
    console.time('Loading users')
    const [loggedUser] = await loadFromDb({model: 'user', fields, id: user._id, user, params:{limit:1000}})
    console.timeEnd('Loading users')
    expect(loggedUser.available_menus.length).toBeGreaterThan(0)
  })

  it('must load current, past && future menus', async () => {
    const user=await User.findOne(USER_CRITERION)
    const fields=`available_menus.start_date,available_menus.end_date`.split(',')
    console.time('Loading users')
    const [loggedUser] = await loadFromDb({model: 'user', fields, id: user._id, user, params:{limit:1000}})
    console.timeEnd('Loading users')
    console.log(loggedUser.available_menus.length)
    loggedUser.available_menus.map(menu => expect(menu.start_date.getTime()).toBeLessThan(Date.now()))
    loggedUser.available_menus.map(menu => expect(menu.end_date.getTime()).toBeGreaterThan(Date.now()))
  })

  it('must simple load current, past && future menus', async () => {
    const loggedUser=await User.findOne(USER_CRITERION, {'available_menus':1, 'company':1, 'dummy':1}).populate('available_menus')
    console.log(loggedUser.available_menus.length)
    console.log(loggedUser.available_menus.map(m => m.name))
    loggedUser.available_menus.map(menu => expect(menu.start_date.getTime()).toBeLessThan(Date.now()))
    loggedUser.available_menus.map(menu => expect(menu.end_date.getTime()).toBeGreaterThan(Date.now()))
  })

  it('Must speed up Users loading', async () => {
    const admin=await User.findOne({role: ROLE_SUPER_ADMIN})
    console.time('Loading users')
    const users = await loadFromDb({model: 'user', fields:['firstname'], user:admin, params:{limit:100000}})
    console.timeEnd('Loading users')
    expect( users.length).toEqual(13948)
  }, 3500)

  it('Must return fields to compute', async () => {
    const fields=['name', 'users.firstname', 'users.contents.title']
    const toCompute=getFieldsToCompute({model: 'company', fields})
    expect(toCompute).toEqual(['users.contents'])
  }, 3500)

  it('Must return stephanoe b appointments count', async () => {
  it('Must return stephanoe b appointments count', async () => {
    const fields=['appointments_count']
    const [user]=await loadFromDb({model: 'user', fields: ['diet_appointments_count'], id: diet._id, user: diet})
  }, 3500)

  it.only('Must return keys progress', async () => {
    const user=await User.findOne(USER_CRITERION)
    const fields=`user_surveys_progress,user_surveys_progress.value_1,picture`.split(',')
    const params={} //{'limit.user_surveys_progress':1, 'limit.user_surveys_progress': 1, limit: 30}
    const keys=await loadFromDb({model: 'key', fields, user, params})
    keys.every(k => expect(k.user_surveys_progress?.length).toBeGreaterThan(0))
    const expectedStructure={date: expect.anything(), value_1: expect.anything()}
    keys.every(k => k.user_surveys_progress.every(p => expect(p).toEqual(expect.objectContaining(expectedStructure))))
  }, 1000)

  it('Must query with case insensitive', async () => {
    const users=await User.find({}, {firstname:1, lastname:1})
      .collation({locale: 'fr', strength:2})
      .sort({firstname: 'desc'}).limit(20)
    console.log(users.map(u => u.fullname).join('\n'))
  }, 3500)

})

