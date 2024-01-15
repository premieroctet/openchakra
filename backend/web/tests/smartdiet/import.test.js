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
const { COMPANY_ACTIVITY_BANQUE, ROLE_EXTERNAL_DIET, ROLE_CUSTOMER } = require('../../server/plugins/smartdiet/consts')
const bcrypt = require('bcryptjs')
const Coaching = require('../../server/models/Coaching')
const { importUsers, importDiets, importDietsAgenda, importCoachings, importAppointments, importCompanies, importContents, importPatientContents, importMeasures, fixFiles, importQuizz, importQuizzQuestions } = require('../../server/plugins/smartdiet/import')
const { prepareCache, getCacheKeys } = require('../../utils/import')
const Content = require('../../server/models/Content')
const Measure = require('../../server/models/Measure')
const fs=require('fs')
const QuizzQuestion = require('../../server/models/QuizzQuestion')

const ROOT = path.join(__dirname, './data/migration')

jest.setTimeout(600000)

describe('Test imports', () => {

  beforeAll(async () => {
    await mongoose.connect(`mongodb://localhost/smartdiet-migration`, MONGOOSE_OPTIONS)
    await prepareCache()
    await fixFiles(ROOT)
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  const ensureNbError = (result, count=0) => {
    const errors=result.filter(r => !r.success)
    if (errors.length>count) {
      console.log(JSON.stringify(errors.slice(0,10), null, 2))
    }
    expect(errors).toHaveLength(count)
  }

  // it('must check questions', async () => {
  //   let quizs=fs.readFileSync(path.join(ROOT, 'smart_quiz.csv')).toString().split('\n').map(l => l.split(';')).filter(t => t.length>1)
  //   let questions=fs.readFileSync(path.join(ROOT, 'smart_question.csv')).toString()
  //   quizs.forEach(([id, title]) => {
  //     if (lodash.isNil(id)) { return}
  //     while (questions.includes(id)) {
  //       questions=questions.replace(id, title)
  //     }
  //   })
  //   questions=questions.split('\n').map(l => l.split(';').slice(0,2).join(';')).join('\n')
  //   fs.writeFileSync('/tmp/expected', lodash.sortBy(questions.split('\n')).join('\n'))

  //   await mongoose.connect(`mongodb://localhost/smartdiet`, MONGOOSE_OPTIONS)
  //   let quizz=await Quizz.find().sort({name:1}).populate('questions')
  //   quizz=quizz.filter(q => !q.name.includes('Journal') && !q.name.includes('Autre repas') && !q.name.includes("Bilan"))
  //   quizz=lodash(quizz).map(quiz => quiz.questions?.map(ques => `"${quiz.name}";"${ques.title}"`)).flattenDeep().join('\n')
  //   console.log(quizz)
  //   // Remove unknown
  //   fs.writeFileSync('/tmp/db', quizz.toString())
  // })

  it('must fix files', async () => {
    await fixFiles(ROOT)
  })

  it('must import companies', async () => {
    const res = await importCompanies(path.join(ROOT, 'smart_project.csv'))
    ensureNbError(res)
    const companies=await Company.find()
    expect(companies).toHaveLength(4)
  })

  it('must import users', async () => {
    const res = await importUsers(path.join(ROOT, 'smart_patient.csv'))
    ensureNbError(res, 5)
    const users=await User.find({role: ROLE_CUSTOMER})
    expect(users.length).toEqual(12318)
  })

  it('must upsert diets', async () => {
    let res = await importDiets(path.join(ROOT, 'smart_diets.csv'))
    ensureNbError(res)
    const diets=await User.find({role: ROLE_EXTERNAL_DIET})
    console.log(diets)
    expect(diets.length).toEqual(855)
  })

  it('must upsert coachings', async () => {
    let res = await importCoachings(path.join(ROOT, 'smart_coaching.csv'))
    ensureNbError(res)
    const coachings=await Coaching.countDocuments()
    expect(coachings).toEqual(76)
  })

  it('must upsert appointments', async () => {
    let res = await importAppointments(path.join(ROOT, 'smart_consultation.csv'))
    ensureNbError(res)
    const appts=await Appointment.countDocuments()
    expect(appts).toEqual(28470)
  })

  it('must upsert measures', async () => {
    let res = await importMeasures(path.join(ROOT, 'smart_measure.csv'))
    ensureNbError(res)
    const measures=await Measure.find()
    expect(measures).toHaveLength(21986)
  })

  it('must upsert quizz', async () => {
    let res = await importQuizz(path.join(ROOT, 'smart_quiz.csv'))
    ensureNbError(res)
    const quizz=await Quizz.find()
    expect(quizz).toHaveLength(42)
  })

  it('must upsert quizz questions', async () => {
    let res = await importQuizzQuestions(path.join(ROOT, 'smart_question.csv'))
    ensureNbError(res)
    const questions=await QuizzQuestion.find({migration_id: {$ne:null}})
    expect(questions).toHaveLength(217)
    const quizz=await Quizz.find()
    expect(quizz.some(q => q.questions.length>0)).toBe(true)
    expect(lodash.sum(quizz.map(q => q.children.length))).toEqual(questions.length)
  })

})

