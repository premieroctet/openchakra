import {getModels} from '../server/utils/database'
import '../server/models/Program'
import '../server/models/Theme'
import '../server/models/Resource'
import '../server/models/Session'
import '../server/models/TrainingCenter'
import '../server/models/TraineeSession'
import '../server/models/User'

describe('Studio models API', () => {

  test('Should return the models names', () => {
    const EXPECTED=new Set(['program', 'theme', 'resource', 'session', 'trainingCenter', 'traineeSession', 'user'])
    const names=getModels().map(d => d.name)
    expect(new Set(names)).toEqual(EXPECTED)
  })

  test.only('Should return the attributes for program', () => {
    const EXPECTED={
      name: {type: 'String', multiple: false},
      code: {type: 'String', multiple: false},
      description: {type: 'String', multiple: false},
      duration: {type: 'Number', multiple: false},
      themes: {type: 'theme', multiple: true},
    }
    const program=getModels().find(d => d.name=='program')
    return expect(program.attributes).toEqual(expect.objectContaining(EXPECTED))
  })

  test('Should return the attributes for session', () => {
    const EXPECTED={
      program: {type: 'program', multiple: false},
      trainees_count: {type: 'Number', multiple: false},
    }
    const session=getModels().find(d => d.name=='session')
    expect(session.attributes).toEqual(expect.objectContaining(EXPECTED))
  })

})
