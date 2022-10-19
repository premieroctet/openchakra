import {getModels, buildQuery, buildPopulate, buildPopulates, MONGOOSE_OPTIONS} from '../server/utils/database'
const mongoose=require('mongoose')
const {
  addResourceToProgram,
  addResourceToSession,
  addResourceToTheme,
  addThemeToProgram,
  addThemeToSession,
  getModel,
  moveChildInParent,
  getNext,
  getPrevious,
} = require('../server/utils/studio/aftral/functions')
const Session = require('../server/models/Session')
const Resource = require('../server/models/Resource')
const Theme = require('../server/models/Theme')
const Program = require('../server/models/Program')
const TraineeTheme = require('../server/models/TraineeTheme')


describe('Studio models API', () => {

  test('Should return the models names', () => {
    const EXPECTED=new Set(['program', 'theme', 'resource', 'session', 'trainingCenter', 'traineeSession', 'user'])
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

  test('Shoud populate virtuals level 1', () => {
    const model='traineeTheme'
    const fields='spent_time'.split(',')
    const query=buildQuery(model, null, fields)
    return expect(query._mongooseOptions.populate?.resources).toBeTruthy()
  })

  test('Shoud populate virtuals level 2', () => {
    const model='traineeSession'
    const fields='spent_time,themes'.split(',')
    const query=buildQuery(model, null, fields)
    return expect(query._mongooseOptions?.populate?.themes?.populate?.[0]?.path).toEqual('resources')
  })
})

describe.only('Studio data function', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/aftral_studio', MONGOOSE_OPTIONS)
  })

  test('Shoud addThemeToProgram', () => {
    return Promise.all([Program.findOne(), Theme.findOne(), Resource.findOne(), Session.findOne()])
      .then(([program, theme, resource, session]) => {
        return addThemeToProgram(program, theme)
      })
      .then(program => {
        return Program.findById(program._id)
      })
  })

  test('Shoud addResourceToProgram', () => {
    return Promise.all([Program.findOne(), Theme.findOne(), Resource.findOne(), Session.findOne()])
      .then(([program, , resource]) => {
        return addResourceToProgram(program, resource)
      })
  })

  test('Shoud addThemeToSession', () => {
    return Promise.all([Program.findOne(), Theme.findOne().populate('resources'), Resource.findOne(), Session.findOne()])
      .then(([, theme, , session]) => {
        return addThemeToSession(session, theme)
      })
  })

  test('Shoud addResourceToSession', () => {
    return Promise.all([Program.findOne(), Theme.findOne(), Resource.findOne(), Session.findOne()])
      .then(([,, resource, session]) => {
        return addResourceToSession(session, resource)
      })
  })

  test('Shoud addResourceToTheme', () => {
    return Promise.all([Program.findOne(), Theme.findOne(), Resource.findOne(), Session.findOne()])
      .then(([, theme, resource]) => {
        return addResourceToTheme(theme, resource)
      })
  })

  test('Shoud levelUp/leveDown theme from program', async() => {
    let oldData=await Program.findOne({'themes.1': {$exists: true}}).populate('themes')
    await moveChildInParent(oldData._id, oldData.themes[0]._id, false)
    let newData=await Program.findById(oldData._id).populate('themes')
    expect(oldData.themes.slice(0, 2).map(t => t._id)).toEqual(newData.themes.slice(0, 2).reverse().map(t => t._id))

    await moveChildInParent(newData._id, newData.themes[1]._id, true)
    newData=await Program.findById(oldData._id).populate('themes')
    expect(oldData.themes.slice(0, 2).map(t => t._id)).toEqual(newData.themes.slice(0, 2).map(t => t._id))
  })

  test('Shoud levelUp/leveDown resource from theme', async() => {
    let oldData=await Theme.findOne({'resources.1': {$exists: true}}).populate('resources')
    await moveChildInParent(oldData._id, oldData.resources[0]._id, false)
    let newData=await Theme.findById(oldData._id).populate('resources')
    expect(oldData.resources.slice(0, 2).map(t => t._id)).toEqual(newData.resources.slice(0, 2).reverse().map(t => t._id))
    await moveChildInParent(newData._id, newData.resources[1]._id, true)
    newData=await Theme.findById(oldData._id).populate('resources')
    expect(oldData.resources.slice(0, 2).map(t => t._id)).toEqual(newData.resources.slice(0, 2).map(t => t._id))
  })

  test('Shoud levelUp/leveDown theme from session', async() => {
    let oldData=await Session.findOne({'themes.1': {$exists: true}}).populate('themes')
    await moveChildInParent(oldData._id, oldData.themes[0]._id, false)
    let newData=await Session.findById(oldData._id).populate('themes')
    expect(oldData.themes.slice(0, 2).map(t => t._id)).toEqual(newData.themes.slice(0, 2).reverse().map(t => t._id))
    await moveChildInParent(newData._id, newData.themes[1]._id, true)
    newData=await Session.findById(oldData._id).populate('themes')
    expect(oldData.themes.slice(0, 2).map(t => t._id)).toEqual(newData.themes.slice(0, 2).map(t => t._id))
  })

  test('Shoud levelUp/leveDown resource from theme session', async() => {
    let oldData=await TraineeTheme.findOne({'resources.1': {$exists: true}}).populate('resources')
    await moveChildInParent(oldData._id, oldData.resources[0]._id, false)
    let newData=await TraineeTheme.findById(oldData._id).populate('resources')
    expect(oldData.resources.slice(0, 2).map(t => t._id)).toEqual(newData.resources.slice(0, 2).reverse().map(t => t._id))
    await moveChildInParent(newData._id, newData.resources[1]._id, true)
    newData=await TraineeTheme.findById(oldData._id).populate('resources')
    expect(oldData.resources.slice(0, 2).map(t => t._id)).toEqual(newData.resources.slice(0, 2).map(t => t._id))
  })

  test('Test model retrieval', async() => {
    const prgm=await Program.findOne({}, {_id: 1})
    expect(getModel(prgm)).resolves.toEqual('program')
    const theme=await Theme.findOne({}, {_id: 1})
    expect(getModel(theme)).resolves.toEqual('theme')
  })

  test('Should return next resource', async() => {
    const res_id='634fc49e775b89a58df3ec87'
    const next_id='634fc49e775b89a58df3ec88'
    const res=await getNext(res_id)
    return expect(res?._id?.toString()).toEqual(next_id)
  })

  test('Should return next theme', async() => {
    const res_id='634fc49f775b89a58df3eca1'
    const next_id='634fc49f775b89a58df3eca3'
    const res=await getNext(res_id)
    return expect(res?._id?.toString()).toEqual(next_id)
  })

  test('Should return same last theme', async() => {
    const res_id='634fc49f775b89a58df3eca5'
    const next_id='634fc49f775b89a58df3eca5'
    const res=await getNext(res_id)
    return expect(res?._id?.toString()).toEqual(next_id)
  })

  test('Should return prev resource', async() => {
    const prev_id='634fc49e775b89a58df3ec87'
    const res_id='634fc49e775b89a58df3ec88'
    const res=await getPrevious(res_id)
    return expect(res?._id?.toString()).toEqual(prev_id)
  })

  test('Should return prev theme', async() => {
    const prev_id='634fc49f775b89a58df3eca1'
    const res_id='634fc49f775b89a58df3eca3'
    const res=await getPrevious(res_id)
    return expect(res?._id?.toString()).toEqual(prev_id)
  })

  test('Should return same first theme', async() => {
    const res_id='634fc49f775b89a58df3eca1'
    const res=await getPrevious(res_id)
    return expect(res?._id?.toString()).toEqual(res_id)
  })


})
