const mongoose = require('mongoose')
const moment = require('moment')
const lodash = require('lodash')
const path = require('path')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const { forceDataModelSmartdiet } = require('../utils')
forceDataModelSmartdiet()
const User = require('../../server/models/User')
const Quizz = require('../../server/models/Quizz')
require('../../server/models/QuizzQuestion')
const Company = require('../../server/models/Company')
require('../../server/models/Content')
require('../../server/models/Comment')
const Appointment=require('../../server/models/Appointment')
const { COMPANY_ACTIVITY_BANQUE, ROLE_EXTERNAL_DIET, ROLE_CUSTOMER, GENDER_MALE, QUIZZ_TYPE_PROGRESS } = require('../../server/plugins/smartdiet/consts')
const bcrypt = require('bcryptjs')
const Coaching = require('../../server/models/Coaching')
const { importUsers, importDiets, importDietsAgenda, importCoachings, importAppointments, importCompanies, importContents, importPatientContents, importMeasures, fixFiles, importQuizz, importQuizzQuestions, importQuizzQuestionAnswer, importUserQuizz, importKeys, importProgressQuizz, importUserProgressQuizz, importOffers, importUserObjectives, importUserAssessmentId, importUserImpactId } = require('../../server/plugins/smartdiet/import')
const { prepareCache, getCacheKeys, displayCache, loadCache, saveCache } = require('../../utils/import')
const Content = require('../../server/models/Content')
const Measure = require('../../server/models/Measure')
const fs=require('fs')
const QuizzQuestion = require('../../server/models/QuizzQuestion')
const Key = require('../../server/models/Key')
const Offer = require('../../server/models/Offer')
require('../../server/models/Item')

const ORIGINAL_DB=true
const DBNAME=ORIGINAL_DB ? 'smartdiet' : 'smartdiet-migration'
const DROP=!ORIGINAL_DB

// const ROOT = path.join(__dirname, './data/migration-tiny')
const ROOT = path.join(__dirname, './data/migration')

jest.setTimeout(60000000)

const forcePasswords = () => {
  const password=bcrypt.hashSync('Password1;')
  return User.updateMany({}, {$set: {password}})
}

const PATIENT_EMAIL = 'lonza85@live.fr'
const DIET_EMAIL = 'raphaelleh.smartdiet@gmail.com'
const QUIZZ_NAME = 'Saisons'
const QUIZZ_ID = 17
describe('Test imports', () => {

  beforeAll(async () => {
    console.log('Before opening database', DBNAME)
    await mongoose.connect(`mongodb://localhost/${DBNAME}`, MONGOOSE_OPTIONS)
    console.log('Opened database', DBNAME)
    //await prepareCache()
    await loadCache()
    await fixFiles(ROOT)
  })
  
  afterAll(async () => {
    await saveCache()
    if (DROP) {
      await mongoose.connection.dropDatabase()
    }
    await mongoose.connection.close()
  })

  const ensureNbError = (result, count=0) => {
    return 
    const errors=result.filter(r => !r.success)
    if (errors.length>count) {
      console.log(JSON.stringify(errors.slice(0,10), null, 2))
    }
    expect(errors.length).toEqual(count)
  }
  it('must import companies', async () => {
    const res = await importCompanies(path.join(ROOT, 'smart_project.csv'))
    ensureNbError(res)
    const companies=await Company.find()
    expect(companies.length).toEqual(12)
  })

  it('must import offers', async () => {
    const res = await importOffers(path.join(ROOT, 'smart_coaching.csv'))
    ensureNbError(res)
    const offersCount=await Offer.countDocuments({migration_id: {$ne:null}})
    expect(offersCount).toEqual(2)
  })

  it('must import users', async () => {
    const res = await importUsers(path.join(ROOT, 'smart_patient.csv'))
    await forcePasswords()
    ensureNbError(res, 6)
    const user=await User.findOne({role: ROLE_CUSTOMER, email: PATIENT_EMAIL})
    expect(user).toBeTruthy()
    expect(user.gender).toEqual(GENDER_MALE)
    expect(moment(user.birthday).format('LL')).toBe(moment('1980-11-13').format('LL'))
  })

  it('must upsert diets', async () => {
    let res = await importDiets(path.join(ROOT, 'smart_diets.csv'))
    await forcePasswords()
    ensureNbError(res)
    const diets=await User.find({role: ROLE_EXTERNAL_DIET, email: DIET_EMAIL})
    expect(diets.length).toEqual(1)
  })

  it('must upsert coachings', async () => {
    let res = await importCoachings(path.join(ROOT, 'smart_coaching.csv'))
    ensureNbError(res, 6)
    const user=await User.findOne({email: PATIENT_EMAIL})
    const coachings=await Coaching.find({user}).populate('progress')
    expect(coachings).toHaveLength(1)
    expect(coachings[0].progress).toBeTruthy()
    expect(coachings[0].progress.type).toEqual(QUIZZ_TYPE_PROGRESS)
  })

  it('must upsert appointments', async () => {
    await importAppointments(path.join(ROOT, 'smart_consultation.csv'))
    const user=await User.findOne({email: PATIENT_EMAIL})
    const coachings=await Coaching.find({user})
    const appts=await Appointment.find({coaching: coachings})
    expect(appts).toHaveLength(2)
    expect(appts.some(a => /pas regardé ce que/.test(a.note))).toBeTruthy()
  })

  it('must upsert measures', async () => {
    let res = await importMeasures(path.join(ROOT, 'smart_measure.csv'))
    ensureNbError(res)
    const user=await User.findOne({email: PATIENT_EMAIL})
    const measures=await Measure.find({user})
    expect(measures.length).toEqual(2)
    console.log(measures)
  })

  it('must upsert quizz', async () => {
    const before=await Quizz.countDocuments()
    let res = await importQuizz(path.join(ROOT, 'smart_quiz.csv'))
    ensureNbError(res)
    const quizz=await Quizz.findOne({migration_id: QUIZZ_ID})
    expect(quizz.name).toEqual(QUIZZ_NAME)
  })

  it('must upsert quizz questions', async () => {
    let res = await importQuizzQuestions(path.join(ROOT, 'smart_question.csv'))
    ensureNbError(res)
    const questions=await QuizzQuestion.find({migration_id: {$ne:null}})
    expect(questions.length).toEqual(243)
    const quizz=await Quizz.findOne({name: QUIZZ_NAME}).populate('questions')
    expect(quizz.questions.length).toEqual(8)
    console.log(quizz.questions.map(q => q.title))
  })

  it('must upsert keys', async () => {
    let res = await importKeys(path.join(ROOT, 'smart_criteria.csv'))
    ensureNbError(res)
    const keys=await Key.find({migration_id: {$ne: null}})
    expect(keys.length).toEqual(7)
  })

  it('must upsert progress quizz', async () => {
    let res = await importProgressQuizz(path.join(ROOT, 'smart_criteria.csv'))
    const quizz=await Quizz.findOne({type: QUIZZ_TYPE_PROGRESS}).populate('questions')
    expect(quizz.questions.length).toEqual(26)
  })

  it.skip('must upsert user progress quizz', async () => {
    let res = await importUserProgressQuizz(path.join(ROOT, 'smart_consultation_progress.csv'), 24000)
    const user=await User.findOne({email: PATIENT_EMAIL})
    const coachings=await Coaching.find({user}).populate('progress')
    console.log(coachings.map(c => c.progress))
  })

  it('must upsert quizz questions answers', async () => {
    let res = await importQuizzQuestionAnswer(path.join(ROOT, 'smart_question.csv'))
    ensureNbError(res)
    const questions=await QuizzQuestion.find({migration_id: {$ne:null}})
    expect(questions).toHaveLength(217)
    const quizz=await Quizz.find()
    expect(quizz.some(q => q.questions.length>0)).toBe(true)
    await prepareCache()
    console.log(lodash(getCacheKeys()).filter(k => k.split('/')[0]=='user_coaching').uniq().value())
  })

  // TODO Fix it
  it('must upsert patients quizzs', async () => {
    let res = await importUserQuizz(path.join(ROOT, 'smart_patient_quiz.csv'))
    console.log(JSON.stringify(res))
    ensureNbError(res)
  })

  // TODO Fix it
  it('must upsert patients objectives', async () => {
    let res = await importUserObjectives(path.join(ROOT, 'smart_objective.csv'))
  })

  // TODO Fix it
  it.only('must upsert patients assessment and impact ids', async () => {
    await importUserAssessmentId(path.join(ROOT, 'smart_summary_reference.csv'))
    await importUserImpactId(path.join(ROOT, 'smart_second_summary_reference.csv'))
  })
  
})

