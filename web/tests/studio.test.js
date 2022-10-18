const {
  addResourceToProgram,
  addResourceToSession,
  addResourceToTheme,
  addThemeToProgram,
  addThemeToSession,
  removeResourceFromProgram,
} = require('../server/utils/studio/aftral/functions');
const Session = require('../server/models/Session');
const Resource = require('../server/models/Resource');
const Theme = require('../server/models/Theme');
const Program = require('../server/models/Program');
import {getModels, buildQuery, buildPopulate, buildPopulates, MONGOOSE_OPTIONS} from '../server/utils/database'

const mongoose=require('mongoose')

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

  beforeAll(()=> {
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
      .then(program => {
        console.log(program.themes)
      })
  })

  test('Shoud addResourceToProgram', () => {
    return Promise.all([Program.findOne(), Theme.findOne(), Resource.findOne(), Session.findOne()])
    .then(([program, theme, resource, session]) => {
        return addResourceToProgram(program, resource)
      })
  })

  test('Shoud addThemeToSession', () => {
    return Promise.all([Program.findOne(), Theme.findOne().populate('resources'), Resource.findOne(), Session.findOne()])
    .then(([program, theme, resource, session]) => {
        return addThemeToSession(session, theme)
      })
  })

  test('Shoud addResourceToSession', () => {
    return Promise.all([Program.findOne(), Theme.findOne(), Resource.findOne(), Session.findOne()])
    .then(([program, theme, resource, session]) => {
        return addResourceToSession(session, resource)
      })
  })

  test('Shoud addResourceToTheme', () => {
    return Promise.all([Program.findOne(), Theme.findOne(), Resource.findOne(), Session.findOne()])
    .then(([program, theme, resource, session]) => {
        return addResourceToTheme(theme, resource)
      })
  })

  test.only('Shoud remove resource from program', () => {
    let program=null
    let theme=null
    return Theme.find({'resources': {$size: 1}})
      .then(themes =>{
        return Program.findOne({themes: {$in: themes}}).populate('themes')
      })
      .then(prgm => {
        program=prgm
        theme=program.themes.find(t => t.resources.length==1)
        const resourceId=theme.resources[0]
        return removeResourceFromProgram(program._id, resourceId._id)
      })
      .then(() => {
        return Theme.findById(theme._id)
      })
      .then(theme => {
        console.log(theme)
        return Program.findById(program._id).populate('themes')
      })
      .then(program => {
        return expect(program.themes.map(t => t._id.toString()).includes(theme._id.toString())).toBeFalsy()
      })
  })

})
