const {
  ACTIVITY,
  CONTENTS_TYPE,
  EVENT_TYPE,
  GENDER,
  HOME_STATUS,
  ROLES,
  TARGET_TYPE
} = require('./consts')
const lodash=require('lodash')
const moment = require('moment')
const User = require('../../models/User')
const {
  declareEnumField,
  declareVirtualField,
  setPreCreateData,
  setPreprocessGet,
} = require('../../utils/database')

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
  declareVirtualField({model: m, field: 'fullname', instance: 'String', requires: 'firstname,lastname'})
  declareVirtualField({model: m, field: 'password2', instance: 'String'})
  declareEnumField({model: m, field: 'home_status', enumValues:HOME_STATUS})
  declareEnumField({model: m, field: 'role', enumValues:ROLES})
  declareEnumField({model: m, field: 'gender', enumValues:GENDER})
  declareEnumField({model: m, field: 'activity', enumValues:ACTIVITY})
})

declareEnumField({model: 'contents', field: 'type', enumValues:CONTENTS_TYPE})

declareEnumField({model: 'event', field: 'type', enumValues:EVENT_TYPE})

declareEnumField({model: 'category', field: 'type', enumValues:TARGET_TYPE})
declareVirtualField({model: 'category', field: 'targets', instance: 'Array',
  requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'target'}}
})

module.exports={
}
