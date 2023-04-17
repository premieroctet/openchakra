const {
  AVAILABILITY,
  COACHING,
  COMPANY_ACTIVITY,
  COMPANY_SIZE,
  COMPANY_STATUS,
  CONTRACT_TYPE,
  EXPERIENCE,
  ROLES
} = require('./consts')
const NATIONALITIES = require('./nationalities.json')
const {
  declareEnumField,
  declareVirtualField,
  setPreCreateData,
  setPreprocessGet,
  setFilterDataUser,
} = require('../../utils/database')

const preprocessGet = ({model, fields, id, user}) => {
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }

  return Promise.resolve({model, fields, id})

}

setPreprocessGet(preprocessGet)

const preCreate = ({model, params, user}) => {
  if (['jobUser', 'request'].includes(model)) {
    params.user=user
  }
  return Promise.resolve({model, params})
}

setPreCreateData(preCreate)


const USER_MODELS=['user', 'loggedUser']
USER_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'full_name', instance: 'String', requires: 'firstname,lastname'})
  declareEnumField({model: m, field: 'role', enumValues: ROLES})
  declareVirtualField({model: m, field: 'profile_progress', instance: 'Number', requires: 'firstname,lastname,email,phone,birthday,nationality,picture,id_card,iban,company_name,company_status,siret,status_report,insurance_type,insurance_report,company_picture'})
  declareEnumField({model: m, field: 'coaching', enumValues: COACHING})
  declareVirtualField({model: m, field: 'password2', instance: 'String'})
  declareEnumField({model: m, field: 'availability', enumValues: AVAILABILITY})
  declareVirtualField({model: m, field: 'comments', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'comment'}}
  })
  declareVirtualField({model: m, field: 'recommandations', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'recommandation'}}
  })
  declareVirtualField({model: m, field: 'quotations', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'quotation'}}
  })
  declareVirtualField({model: m, field: 'jobs', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'jobUser'}}
  })
  declareEnumField({model: m, field: 'nationality', enumValues: NATIONALITIES})
  declareEnumField({model: m, field: 'company_status', enumValues: COMPANY_STATUS})
  declareEnumField({model: m, field: 'company_activity', enumValues: COMPANY_ACTIVITY})
  declareEnumField({model: m, field: 'company_size', enumValues: COMPANY_SIZE})
  declareVirtualField({model: m, field: 'requests', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'request'}}
  })
})

declareEnumField({model: 'company', field: 'status', enumValues: COMPANY_STATUS})
declareEnumField({model: 'jobUser', field: 'experience', enumValues: EXPERIENCE})
declareVirtualField({model: 'jobUser', field: 'activities', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'activity'}}
})
declareVirtualField({model: 'jobUser', field: 'skills', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'skill'}}
})
declareVirtualField({model: 'jobUser', field: 'location_str', instance: 'String', requires: 'customer_location,foreign_location'})
declareVirtualField({model: 'jobUser', field: 'search_field', instance: 'String', requires: 'name,skills.name,activities.name'})
declareVirtualField({model: 'jobUser', field: 'experiences', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'experience'}}
})

declareEnumField({model: 'experience', field: 'contract_type', enumValues: CONTRACT_TYPE})
