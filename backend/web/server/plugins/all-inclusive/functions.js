const {
  declareEnumField,
  declareVirtualField,
  idEqual,
  setFilterDataUser,
  setPreCreateData,
  setPreprocessGet,
} = require('../../utils/database')
const User = require('../../models/User')
const { CREATED_AT_ATTRIBUTE } = require('../../../utils/consts')
const lodash=require('lodash')
const Message = require('../../models/Message')
const {
  AVAILABILITY,
  COACHING,
  COMPANY_ACTIVITY,
  COMPANY_SIZE,
  COMPANY_STATUS,
  CONTRACT_TYPE,
  EXPERIENCE,
  QUOTATION_STATUS,
  ROLES,
  MISSION_FREQUENCY,
} = require('./consts')
const NATIONALITIES = require('./nationalities.json')

const preprocessGet = ({model, fields, id, user}) => {
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }

  if (model=='conversation') {
    const getPartner= (m, user) => {
      return idEqual(m.sender._id, user._id) ? m.receiver : m.sender
    }

    return Message.find({$or: [{sender: user._id}, {receiver: user._id}]})
      .populate({path: 'sender', populate: {path: 'company'}})
      .populate({path: 'receiver', populate: {path: 'company'}})
      .sort({CREATED_AT_ATTRIBUTE: 1})
      .then(messages => {
        if (id) {
          messages=messages.filter(m => idEqual(getPartner(m, user)._id, id))
          // If no messages for one parner, forge it
          if (lodash.isEmpty(messages)) {
            return User.findById(id).populate('company')
              .then(partner => {
                const data=[{_id: partner._id, partner, messages: []}]
                return {model, fields, id, data}
              })
          }
        }
        const partnerMessages=lodash.groupBy(messages, m => getPartner(m, user)._id)
        const convs=lodash(partnerMessages)
          .values()
          .map(msgs => { const partner=getPartner(msgs[0], user); return ({_id: partner._id, partner, messages: msgs}) })
          .sortBy(CREATED_AT_ATTRIBUTE, 'asc')
        return {model, fields, id, data: convs}
      })
  }

  return Promise.resolve({model, fields, id})

}

setPreprocessGet(preprocessGet)

const preCreate = ({model, params, user}) => {
  if (['jobUser', 'request', 'mission'].includes(model)) {
    params.user=user
  }
  return Promise.resolve({model, params})
}

setPreCreateData(preCreate)


const USER_MODELS=['user', 'loggedUser']
USER_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'full_name', instance: 'String', requires: 'firstname,lastname'})
  declareEnumField({model: m, field: 'role', enumValues: ROLES})
  declareVirtualField({model: m, field: 'profile_progress', instance: 'Number', requires: 'firstname,lastname,email,phone,birthday,nationality,picture,identity_proof_1,iban,company_name,company_status,siret,status_report,insurance_type,insurance_report,company_picture'})
  declareEnumField({model: m, field: 'coaching', enumValues: COACHING})
  declareVirtualField({model: m, field: 'password2', instance: 'String'})
  declareEnumField({model: m, field: 'availability', enumValues: AVAILABILITY})
  declareVirtualField({model: m, field: 'comments', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'comment'}}
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
  declareVirtualField({model: m, field: 'qualified_str', instance: 'String'})
  declareVirtualField({model: m, field: 'visible_str', instance: 'String'})
  declareVirtualField({model: m, field: 'finished_missions_count', instance: 'Number', requires: 'missions'})
    declareVirtualField({model: m, field: 'customer_missions', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'mission'}}
  })
  declareVirtualField({model: m, field: 'recommandations_count', instance: 'Number', requires: 'jobs'})
  declareVirtualField({model: m, field: 'recommandations_note', instance: 'Number', requires: 'jobs'})
  declareVirtualField({model: m, field: 'comments_count', instance: 'Number', requires: 'jobs'})
  declareVirtualField({model: m, field: 'comments_note', instance: 'Number', requires: 'jobs'})
  declareVirtualField({model: m, field: 'revenue', instance: 'Number', requires: 'missions.quotations'})
  declareVirtualField({model: m, field: 'revenue_to_come', instance: 'Number', requires: 'missions.quotations'})
  declareVirtualField({model: m, field: 'accepted_quotations_count', instance: 'Number', requires: 'missions.quotations'})
  declareVirtualField({model: m, field: 'profile_shares_count', instance: 'Number', requires: ''})
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
declareVirtualField({model: 'jobUser', field: 'diploma', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'diploma'}}
})
declareVirtualField({model: 'jobUser', field: 'photos', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'photo'}}
})
declareVirtualField({model: 'jobUser', field: 'recommandations', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'recommandation'}}
})
declareVirtualField({model: 'jobUser', field: 'missions', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'mission'}}
})
declareVirtualField({model: 'jobUser', field: 'comments', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'comment'}}
})


declareEnumField({model: 'experience', field: 'contract_type', enumValues: CONTRACT_TYPE})

declareVirtualField({model: 'mission', field: 'status', instance: 'String', enumValues: QUOTATION_STATUS,
    requires: 'customer_accept_billing_date,customer_refuse_billing_date,billing_sent_date,ti_finished_date,customer_refuse_quotation_date,customer_accept_quotation_date,ti_refuse_date,quotation_sent_date,job'})
declareVirtualField({model: 'mission', field: 'quotations', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'quotation'}}
})
declareEnumField({model: 'mission', field: 'frequency', enumValues: MISSION_FREQUENCY})
declareVirtualField({model: 'mission', field: 'location_str', instance: 'String', requires: 'customer_location,foreign_location'})
declareVirtualField({model: 'mission', field: 'ti_tip', instance: 'String', requires: ''})
declareVirtualField({model: 'mission', field: 'customer_tip', instance: 'String', requires: ''})


declareVirtualField({model: 'quotation', field: 'details', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'quotationDetail'}}
})
declareVirtualField({model: 'quotation', field: 'total', instance: 'Number', requires: 'details'})

declareVirtualField({model: 'quotationDetail', field: 'total', instance: 'Number', requires: 'quantity,ht_price,vat'})
