const {
  APPOINTMENT_TYPE,
  REMINDER_TYPE,
  GENDER,
  MEASURE_TYPE,
  SMOKER_TYPE,
} = require('../../../../utils/dekuple/consts')
const {
  declareEnumField,
  declareVirtualField,
  setPreCreateData,
  setPreprocessGet,
} = require('../../database')


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
  declareEnumField({model: m, field: 'smoker', enumValues: SMOKER_TYPE})
  declareVirtualField({model: m, field: 'fullname', instance: 'String', requires: 'firstname,lastname'})
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

declareEnumField({model: 'appointment', field: 'type', instance: 'String', enumValues: APPOINTMENT_TYPE})
declareVirtualField({model: 'appointment', field: 'type_str', instance: 'String', requires: 'type,otherTitle'})

declareEnumField({model: 'reminder', field: 'type', instance: 'String', enumValues: REMINDER_TYPE})
declareVirtualField({model: 'reminder', field: 'type_str', instance: 'String', requires: 'type,otherTitle'})
declareVirtualField({model: 'reminder', field: 'reccurency_str', instance: 'String', requires: 'monday,tuesday,wednesday,thursday,friday,saturday,sunday'})
