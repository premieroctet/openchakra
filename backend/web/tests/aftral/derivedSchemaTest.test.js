const moment = require('moment')
const mongoose = require('mongoose')
const lodash=require('lodash')
const {forceDataModelAftralStudio}=require('../utils')
forceDataModelAftralStudio()
const {
  moveChildInParent,
} = require('../../server/utils/studio/aftral_studio/functions')
const Program = require('../../server/models/Program')
const User = require('../../server/models/User')
const Session = require('../../server/models/Session')
const Theme = require('../../server/models/Theme')
const {MONGOOSE_OPTIONS, cloneModel} = require('../../server/utils/database')
const Resource = require('../../server/models/Resource')
require('../../server/models/TrainingCenter')

jest.setTimeout(20000)

describe('Schema inheritance tests', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  test('Should clone resource', async() => {
    const origin=await Resource.create({url: 'https://url'})
    const cloned=await cloneModel({data: origin})
    return expect(lodash.omit(cloned.toObject(), ['id', '_id', 'origin']))
      .toMatchObject(lodash.omit(origin.toObject(), ['id', '_id']))
  })

  test('Should clone theme', async() => {
    const resource=await Resource.create({url: 'https://url'})
    const originTheme=await Theme.create({name: 'Thème', resources: [resource]})
    const clonedTheme=await cloneModel({data: originTheme})
    return expect(clonedTheme.resources[0]._id.toString()).not.toBe(originTheme.resources[0]._id.toString())
  })

  test('Should clone session but not trainees', async() => {
    const trainee=await User.create({firstname: 'firstname', name: 'name', role: 'apprenant', email: 'email'})
    const resource=await Resource.create({url: 'https://url'})
    const theme=await Theme.create({name: 'Thème', resources: [resource]})
    const program=await Program.create({themes: [theme]})
    const originSession=await Session.create({code: 'Session', trainees: [trainee]})
    expect(originSession.trainees).toHaveLength(1)
    const clonedSesion=await cloneModel({data: originSession, forceData: {trainees: []}})
    originSession.program=program
    await originSession.save()
    return expect(clonedSesion.trainees).toHaveLength(0)
  })

  test('Check hooks', async() => {
    const trainee=await User.create({firstname: 'firstname', name: 'name', role: 'apprenant', email: 'email'})
    const resource=await Resource.create({url: 'https://url'})
    const theme=await Theme.create({name: 'Thème', resources: [resource]})
    const program=await Program.create({themes: [theme]})
    const originSession=await Session.create({code: 'Session', program, trainees: [trainee]})
    await Promise.all(lodash.range(1).map(() => cloneModel({data: originSession})))
    await Session.find().populate({path: 'themes', populate: 'resources'})
    await moveChildInParent(originSession._id, theme._id, false)
    return
  })

})
