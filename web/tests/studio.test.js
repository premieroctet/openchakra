const {
  addChildToParent,
  getNext,
  getPrevious,
  moveChildInParent,
} = require('../server/utils/studio/aftral/functions');
const lodash=require('lodash')
const {
  MONGOOSE_OPTIONS,
  buildPopulate,
  buildPopulates,
  buildQuery,
  getModel,
  getModels
} = require('../server/utils/database');
const mongoose=require('mongoose')
const Session = require('../server/models/Session')
const Resource = require('../server/models/Resource')
const Theme = require('../server/models/Theme')
const Program = require('../server/models/Program')


describe('Studio models API', () => {

  test('Should return the models names', () => {
    const EXPECTED=new Set(['program', 'theme', 'resource', 'session', 'trainingCenter', 'user'])
    const names=getModels().map(d => d.name)
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
    const program=getModels().find(d => d.name=='program')
    return expect(program.attributes).toEqual(expect.objectContaining(EXPECTED))
  })

  test('Should return the attributes for session', () => {
    const EXPECTED={
      program: {type: 'program', multiple: false, ref: true},
      trainees_count: {type: 'Number', multiple: false, ref: false},
    }
    const session=getModels().find(d => d.name=='session')
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
    const fields2=['session.trainers', 'session.trainees']
  })

  test('Should populate virtuals level 1', () => {
    const model='theme'
    const fields='spent_time'.split(',')
    const query=buildQuery(model, null, fields)
    return expect(query._mongooseOptions.populate?.resources).toBeTruthy()
  })

  test('Should populate virtuals level 2', () => {
    const model='session'
    const fields='spent_time'.split(',')
    const query=buildQuery(model, null, fields)
    return expect(query._mongooseOptions?.populate?.themes?.populate?.[0]?.path).toEqual('resources')
  })
})

describe.only('Studio data function', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
      .then(() => mongoose.connection.dropDatabase())
      .then(() => Resource.create([{}, {}, {}, {}]))
      .then(resources => Theme.create([{resources: resources.slice(0, 2)}, {resources: resources.slice(2, 4)}]))
      .then(themes => Promise.all([Program.create({themes: themes}), Session.create({themes: themes})]))
  })

  test('Should add theme to program', async () => {
    const [program, theme]=await Promise.all([Program.findOne(), Theme.findOne({origin: null})])
    await addChildToParent(program._id, theme._id)
    const newProgram=await Program.findById(program._id).populate('themes')
    return expect(newProgram.themes.length).toBe(program.themes.length+1)
  })

  test('Should addResourceToProgram', async () => {
    const [program, resource]=await Promise.all([Program.findOne().populate('themes'), Resource.findOne()])
    await addChildToParent(program, resource)
    const newProgram=await Program.findById(program._id).populate({path: 'themes', populate: 'resources'})
    expect(newProgram.themes.length).toBe(program.themes.length+1)
    expect(lodash.last(newProgram.themes).resources[0].origin._id.toString()).toBe(resource._id.toString())
  })

  test.only('Should addThemeToSession', () => {
    return Promise.all([Session.findOne(), Theme.findOne().populate('resources')])
      .then(([session, theme]) => {
        console.log(`Origin ? ${session.origin}`)
        return addChildToParent(session._id, theme._id)
      })
  })

  test('Should addResourceToSession', () => {
    return Promise.all([Session.findOne(), Resource.findOne()])
      .then(([session, resource]) => {
        return addChildToParent(session, resource)
      })
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

  test('Should return next resource', async () => {
    const session=await Session.findOne().populate('themes')
    const [resource_id, next_resource_id]=session.themes[0].resources.slice(0,2)
    const nextResource=await getNext(resource_id)
    return expect(nextResource?._id?.toString()).toEqual(next_resource_id.toString())
  })

  test('Should return prev resource', async() => {
    const session=await Session.findOne().populate('themes')
    const [prev_resource_id, resource_id]=session.themes[0].resources.slice(0,2)
    const prevResource=await getPrevious(resource_id)
    return expect(prevResource?._id?.toString()).toEqual(prev_resource_id.toString())
  })

  test('Should return next resource crossing themes', async () => {
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

})
