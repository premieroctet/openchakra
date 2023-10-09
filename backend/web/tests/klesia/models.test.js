const moment=require('moment')
const mongoose = require('mongoose')
const BestPractices = require('../../server/models/BestPractices')
const Content = require('../../server/models/Content')
const Module = require('../../server/models/Module')
const Tip = require('../../server/models/Tip')
const Article = require('../../server/models/Article')
const Step = require('../../server/models/Step')
const User = require('../../server/models/User')
const Emergency = require('../../server/models/Emergency')
const Quizz = require('../../server/models/Quizz')
const {forceDataModelKlesia} = require('../utils')

forceDataModelKlesia()
require('../../server/plugins/klesia/functions')
const {MONGOOSE_OPTIONS, getModels} = require('../../server/utils/database')
require('../../server/models/User')
require('../../server/models/Article')
require('../../server/models/Tip')
require('../../server/models/Module')
require('../../server/models/BestPractices')
require('../../server/models/Quizz')
require('../../server/models/Emergency')

describe('Test DB', () => {

  let user

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    user=await User.create({password: '1', email: 'a@a.com', lastname: 'l', firstname: 'f'})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  afterEach(async() => {
    await Content.deleteMany({})
  })

  it('must display models', async() => {
    await getModels()
  })

  it('must return steps', async() => {
    const emergency=await Emergency.create({title: 'Titre', excerpt: 'résumé', creator: user})
    await Step.create({order: 9, title: 'Titre 9', container: emergency._id})
    await Step.create({order: 1, title: 'Titre 1', container: emergency._id})
    await Step.create({order: 5, title: 'Titre 5', container: emergency._id})
    const loadedEmergency=await Emergency.findOne().populate('steps')
    expect(loadedEmergency.steps?.length).toEqual(3)
    const [s1, s2, s3]=loadedEmergency.steps
    expect(s1.order).toBeLessThan(s2.order)
    expect(s2.order).toBeLessThan(s3.order)
  })

  it('Must create correct types', async() => {
    await Article.create({excerpt: 'Extrait', title: 'Article', creator: user, body: 'body'})
    const articles=await Article.find()
    await Tip.create({excerpt: 'Extrait', title: 'Tip', creator: user, body: 'body'})
    const tips=await Tip.find()
    await Module.create({excerpt: 'Extrait', title: 'Module', creator: user, body: 'body', contents: [...articles, ...tips]})
    const modules=await Module.find()
    await Quizz.create({excerpt: 'Extrait', title: 'Quizz', creator: user})
    const quizzs=await Quizz.find()
    await Emergency.create({excerpt: 'Extrait', title: 'Emergency', creator: user, body: 'body'})
    const emergency=await Emergency.find()
    await BestPractices.create({excerpt: 'Extrait', title: 'Best practices', creator: user, body: 'body'})
    const bestPractices=await BestPractices.find()
    const contents=await Content.find()
    expect(new Set(contents.map(c => c.type))).toEqual(new Set(['article', 'quizz', 'module', 'tip', 'emergency', 'bestPractices']))
    expect(articles.length).toBe(1)
    expect(tips.length).toBe(1)
    expect(modules.length).toBe(1)
    expect(quizzs.length).toBe(1)
    expect(emergency.length).toBe(1)
    expect(bestPractices.length).toBe(1)
    expect(contents.length).toBe(6)
    expect(modules[0].extra_info).toEqual('2 contenu(s)')
  })

})
