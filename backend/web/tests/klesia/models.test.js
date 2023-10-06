const Step = require('../../server/models/Step')
const User = require('../../server/models/User')
const Emergency = require('../../server/models/Emergency')
const moment=require('moment')
const mongoose = require('mongoose')
const { forceDataModelKlesia } = require('../utils')

forceDataModelKlesia()
require('../../server/plugins/klesia/functions')
const { MONGOOSE_OPTIONS, getModels } = require('../../server/utils/database')
require('../../server/models/User')
require('../../server/models/Article')
require('../../server/models/Tip')
require('../../server/models/Module')
require('../../server/models/BestPractices')
require('../../server/models/Quizz')
require('../../server/models/Emergency')
require('../../server/models/StepsContainer')

describe('Test DB', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must display models', async() => {
    const models=await getModels()
    console.log(Object.keys(models))
  })

  it('must return steps', async() => {
    const user=await User.create({password: '1', email: 'a@a.com', lastname:'l', firstname: 'f'})
    const emergency=await Emergency.create({title: 'Titre', excerpt: 'résumé', creator: user})
    await Step.create({order:9, title: 'Titre 9', container: emergency._id})
    await Step.create({order:1, title: 'Titre 1', container: emergency._id})
    await Step.create({order:5, title: 'Titre 5', container: emergency._id})
    const loadedEmergency=await Emergency.findOne().populate('steps')
    console.log(loadedEmergency)
  })

})
