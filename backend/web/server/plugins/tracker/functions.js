const {declareVirtualField, declareEnumField, setPreprocessGet}=require('../../utils/database')
const {ROLES, ISSUE_STATUS}=require('./consts')

declareVirtualField({model: 'loggedUser', field: 'password2', type: 'String'})
declareVirtualField({model: 'user', field: 'password2', type: 'String'})
declareEnumField({model: 'loggedUser', field: 'role', enumValues: ROLES})
declareEnumField({model: 'user', field: 'role', enumValues: ROLES})

declareVirtualField({model: 'company', field: 'users',
  instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'user'}},
})

declareEnumField({model: 'issue', field: 'status', enumValues: ISSUE_STATUS})

const preprocessGet = ({model, fields, id, user, params}) => {
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }
  return Promise.resolve({model, fields, id})
}

setPreprocessGet(preprocessGet)

