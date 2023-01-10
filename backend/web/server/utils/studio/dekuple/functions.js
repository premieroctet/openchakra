const {
  declareEnumField,
  declareVirtualField,
  setPreCreateData,
  setPreprocessGet,
} = require('../../database')
const {GENDER, MEASURE_TYPE} = require('../../../../utils/dekuple/consts')


const preCreate = ({model, params, user}) => {
  if (['measure', 'appointment', 'reminder'].includes(model)) {
    params.user=user
  }
  return Promise.resolve({model, params})
}

setPreCreateData(preCreate)


const preprocessGet = ({model, fields, id, user}) => {
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }

  return Promise.resolve({model, fields, id})

}

setPreprocessGet(preprocessGet)


const USER_MODELS=['user', 'loggedUser']
USER_MODELS.forEach(m => {
  declareEnumField({model: m, field: 'gender', enumValues: GENDER})
  declareVirtualField({model: m, field: 'measures', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'measure'}}})
  declareVirtualField({model: m, field: 'appointments', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'appointment'}}})
  declareVirtualField({model: m, field: 'reminders', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'reminder'}}})
})

declareEnumField({model: 'measure', field: 'type', enumValues: MEASURE_TYPE})
declareVirtualField({model: 'measure', field: 'recommandation', instance: 'String', requires: 'sys,dia'})
