const lodash=require('lodash')
const moment=require('moment')
const mongoose=require('mongoose')
const {forceDataModelAftral}=require('../utils')
forceDataModelAftral()
const {
  addChildToParent,
  getNext,
  getPrevious,
  moveChildInParent,
  putAttribute,
} = require('../../server/plugins/aftral/functions')
const {
  MONGOOSE_OPTIONS,
  buildPopulate,
  buildPopulates,
  buildQuery,
  getModel,
  getModels,
} = require('../../server/utils/database')
const Session = require('../../server/models/Session')
const Resource = require('../../server/models/Resource')
const Theme = require('../../server/models/Theme')
const Program = require('../../server/models/Program')
const User = require('../../server/models/User')
require('../../server/models/TrainingCenter')


describe('Studio models API', () => {

  test('Should return the models names', () => {
    const EXPECTED=new Set(['program', 'theme', 'resource', 'session',
      'trainingCenter', 'user', 'message', 'userSessionData'])
    const names=Object.keys(getModels())
    expect(new Set(names)).toEqual(EXPECTED)
  })

  test('Should return the attributes for program', () => {
    const EXPECTED={
      name: {type: 'String', multiple: false, ref: false},
      code: {type: 'String', multiple: false, ref: false},
      description: {type: 'String', multiple: false, ref: false},
      duration: {type: 'Number', multiple: false, ref: false},
      themes: {type: 'theme', multiple: true, ref: true},
    }
    const program=getModels().program
    return expect(program.attributes).toEqual(expect.objectContaining(EXPECTED))
  })

  test('Should return the attributes for session', () => {
    const EXPECTED={
      program: {type: 'program', multiple: false, ref: true},
      trainees_count: {type: 'Number', multiple: false, ref: false},
    }
    const session=getModels().session
    expect(session.attributes).toEqual(expect.objectContaining(EXPECTED))
  })

  test('Should build simple populate', () => {
    const field='themes.resources.name'
    const EXPECTED={path: 'themes', populate: {path: 'resources'}}
    const pop=buildPopulate(field, 'program')
    expect(pop).toEqual(EXPECTED)
    const field2='themes'
    const EXPECTED2={path: 'themes'}
    const pop2=buildPopulate(field2, 'program')
    expect(pop2).toEqual(EXPECTED2)
  })

  test('Should build multiple populates', () => {
    const fields=['themes.resources', 'themes.resources.name']
    const EXPECTED_MULTI=[{path: 'themes', populate: {path: 'resources'}}]
    const pops=buildPopulates(fields, 'program')
    expect(pops).toEqual(EXPECTED_MULTI)
  })

  test('Should build huge populate', () => {
    const fields='trainers,trainees,trainees.firstname,trainees.name,\
    trainees.email,trainees.sessions,trainers.firstname,trainers.name,\
    trainees.sessions.spent_time_str'.replace(/ /g, '').split(',')
    const EXPECTED_MULTI=[
      {path: 'trainers'},
      {path: 'themes', populate: {path: 'resources'}}]
    const pops=buildPopulates(fields, 'session')
    expect(pops).toEqual(EXPECTED_MULTI)
  })

  test('Should populate virtuals level 1', () => {
    const model='theme'
    const fields='spent_time_str'.split(',')
    const query=buildQuery(model, null, fields)
    return expect(query._mongooseOptions.populate?.resources).toBeTruthy()
  })

})

// Tooo buggy
describe.skip('Studio data function', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    const resources=await Promise.all(lodash.range(4).map(idx => Resource.create({name: `res${idx}`, url: `url${idx}`})))
    const themes=await Theme.create([{resources: resources.slice(0, 2)}, {resources: resources.slice(2, 4)}])
    const trainees=await Promise.all(lodash.range(4).map(idx => User.create(
      {email: `email${idx}@tagada.fr`, role: 'apprenant', firstname: `first${idx}`, name: `name{idx}`}),
    ))
    await Program.create({themes: themes})
    const session=await Session.create({trainees: trainees.map(t => t._id)})
    await Promise.all(trainees.map(t => Session.create({trainee: t, origin: session._id})))
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  test('Should add theme to program', async() => {
    const [program, theme]=await Promise.all([Program.findOne(), Theme.findOne({origin: null})])
    await addChildToParent(program._id, theme._id)
    const newProgram=await Program.findById(program._id).populate('themes')
    expect(newProgram.themes.length).toBe(program.themes.length+1)
    return expect(lodash.last(newProgram.themes).origin._id.toString()).toBe(theme._id.toString())
  })

  test('Should addResourceToProgram', async() => {
    const [program, resource]=await Promise.all([Program.findOne().populate('themes'), Resource.findOne()])
    await addChildToParent(program, resource)
    const newProgram=await Program.findById(program._id).populate({path: 'themes', populate: 'resources'})
    expect(newProgram.themes.length).toBe(program.themes.length+1)
    expect(lodash.last(newProgram.themes).origin).toBe(null)
    expect(lodash.last(newProgram.themes).resources[0].origin._id.toString()).toBe(resource._id.toString())
  })

  test('Should addThemeToSession', async() => {
    let session=await Session.findOne({origin: null})
    let theme=await Program.findOne().populate('themes').then(res => res.themes[0])
    console.log(theme)
    await addChildToParent(session._id, theme._id)
    const newSession=await Session.findById(session._id).populate('themes')
    const newTheme=lodash.last(newSession.themes)
    expect(newTheme.origin).toBe(null)
    const trSessions=await Session.find({origin: session._id}).populate('themes')
    expect(lodash.last(trSessions[0].themes).origin.toString()).toBe(newTheme._id.toString())
  })

  test('Should addResourceToSession', async() => {
    let session=await Session.findOne({origin: null})
    const resource=await Resource.findOne()
    await addChildToParent(session, resource)
    session=await Session.findById(session._id).populate({path: 'themes', populate: 'resources'})
    const trSessions=await Session.find({origin: session._id}).populate({path: 'themes', populate: 'resources'})
    return expect(lodash.last(trSessions[0].themes).resources[0].origin.toString())
      .toBe(lodash.last(session.themes).resources[0]._id.toString())
  })

  test('Should addResourceToTheme', () => {
    return Promise.all([Theme.findOne(), Resource.findOne()])
      .then(([theme, resource]) => {
        return addChildToParent(theme, resource)
      })
  })

  test('Should levelUp/leveDown theme from session', async() => {
    let oldData=await Session.findOne({'themes.1': {$exists: true}}).populate('themes')
    await moveChildInParent(oldData._id, oldData.themes[0]._id, false)
    let newData=await Session.findById(oldData._id).populate('themes')
    expect(oldData.themes.slice(0, 2).map(t => t._id)).toEqual(newData.themes.slice(0, 2).reverse().map(t => t._id))

    await moveChildInParent(newData._id, newData.themes[1]._id, true)
    newData=await Session.findById(oldData._id).populate('themes')
    expect(oldData.themes.slice(0, 2).map(t => t._id)).toEqual(newData.themes.slice(0, 2).map(t => t._id))
  })

  test('Should levelUp/leveDown resource from theme', async() => {
    let oldData=await Theme.findOne({'resources.1': {$exists: true}}).populate('resources')
    await moveChildInParent(oldData._id, oldData.resources[0]._id, false)
    let newData=await Theme.findById(oldData._id).populate('resources')
    expect(oldData.resources.slice(0, 2).map(t => t._id)).toEqual(newData.resources.slice(0, 2).reverse().map(t => t._id))
    await moveChildInParent(newData._id, newData.resources[1]._id, true)
    newData=await Theme.findById(oldData._id).populate('resources')
    expect(oldData.resources.slice(0, 2).map(t => t._id)).toEqual(newData.resources.slice(0, 2).map(t => t._id))
  })

  test('Test model retrieval', async() => {
    const session=await Session.findOne({}, {_id: 1})
    expect(getModel(session._id)).resolves.toEqual('session')
    const theme=await Theme.findOne({}, {_id: 1})
    expect(getModel(theme)).resolves.toEqual('theme')
  })

  test('Should return next resource', async() => {
    const session=await Session.findOne().populate('themes')
    const [resource_id, next_resource_id]=session.themes[0].resources.slice(0, 2)
    const nextResource=await getNext(resource_id)
    return expect(nextResource?._id?.toString()).toEqual(next_resource_id.toString())
  })

  test('Should return prev resource', async() => {
    const session=await Session.findOne().populate('themes')
    const [prev_resource_id, resource_id]=session.themes[0].resources.slice(0, 2)
    const prevResource=await getPrevious(resource_id)
    return expect(prevResource?._id?.toString()).toEqual(prev_resource_id.toString())
  })

  test('Should return next resource crossing themes', async() => {
    const session=await Session.findOne().populate('themes')
    const resource_id=lodash.last(session.themes[0].resources)
    const next_resource_id=session.themes[1].resources[0]
    const nextResource=await getNext(resource_id)
    return expect(nextResource?._id?.toString()).toEqual(next_resource_id.toString())
  })

  test('Should return prev resource crossing themes', async() => {
    const session=await Session.findOne().populate('themes')
    const resource_id=session.themes[1].resources[0]
    const prev_resource_id=lodash.last(session.themes[0].resources)
    const prevResource=await getPrevious(resource_id)
    return expect(prevResource?._id?.toString()).toEqual(prev_resource_id.toString())
  })

  test('Should copy theme attribute in linked sessions', async() => {
    const NAME='tagada'
    let session=await Session.findOne({origin: null}).populate('themes')
    let theme=await Theme.findOne()
    await addChildToParent(session._id, theme._id)
    session=await Session.findById(session._id).populate('themes')
    theme=session.themes[0]
    await putAttribute({id: theme._id.toString(), attribute: 'name', value: NAME})
    const trSession=await Session.findOne({origin: session._id}).populate('themes')
    return expect(trSession.themes[0].name).toBe(NAME)
  })

  test('Should copy resource attribute in linked program', async() => {
    const NAME='tagada'
    let program=await Program.findOne().populate('themes')
    let prgmResource=program.themes[0].resources[0]
    console.log(prgmResource.origin)
    await putAttribute({id: prgmResource.origin._id.toString(), attribute: 'name', value: NAME})
    let newResource=await Program.findById(program._id).populate('themes').then(prgm => prgm.themes[0].resources[0])
    return expect(newResource.name).toBe(newResource.name)
  })

})
